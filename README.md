# LogiTrack — Partie 3 : Monitoring & Observabilité

Stack complète de supervision pour l'API LogiTrack : métriques (Prometheus), logs (Loki + Promtail),
visualisation (Grafana) et alerting (Alertmanager). Le tout orchestré par Docker Compose.

## Architecture

```
                    ┌─────────────────────────────────────────────────────┐
 mouillage           │                       Prometheus                     │
  grafana            │  (métriques)          :9090                          │
 :3000  ──────────►  │    │ scrape /actuator/prometheus (10s)               │
  dashboard          │    ▼                                                │
  13 panneaux        │  API LogiTrack ──► MySQL (:3307)                    │
                    │    │ (logs)                                          │
                    │    ▼                                                │
                    │  Promtail (9080) ─► Loki (:3100)  ◄── Grafana        │
                    │    alertes │                                        │
                    │            ▼                                        │
                    │  Alertmanager (:9093) ─► alert-display (webhook)    │
                    └─────────────────────────────────────────────────────┘
```

| Service | Image | Port | Rôle |
|---|---|---|---|
| `mysql` | mysql:8.4 | **3307** (host) → 3306 | Base MySQL (8.4), volume *mysql-data* |
| `api` | `Dockerfile` (multi-stage) | **8087** | API Spring Boot 3.4 (Java 21) |
| `prometheus` | prom/prometheus:v2.53.2 | **9090** | Métriques, règles d'alerte, évaluation 15s |
| `grafana` | grafana/grafana:11.4.0 | **3000** | Dashboard + datasources auto-provisionnées |
| `loki` | grafana/loki:3.2.2 | **3100** | Agrégation des logs (schéma TSDB v13) |
| `promtail` | grafana/promtail:3.2.2 | — | Collecte `/logs/*.log`, label `level` |
| `alertmanager` | prom/alertmanager:v0.27.0 | **9093** | Routage/notification des alertes |
| `alert-display` | python:3.12-alpine | — | Récepteur webhook de démonstration |

## Prérequis

- Docker Desktop (25+) avec moteur Docker Compose v2
- Windows (scripts PowerShell fournis) ; aucune installation Java/Maven requise pour lancer la stack
- L'API est construite dans l'image (`docker compose up --build`) : Maven + JDK 21 embarqués

## Démarrage rapide

```powershell
docker compose up -d --build      # construit l'image API puis monte les 8 services
docker compose ps                 # vérifier les états (mysql = healthy)
```

| URL | Quoi |
|---|---|
| http://localhost:8087/actuator/health | Santé de l'API (JSON) |
| http://localhost:8087/actuator/prometheus | Métriques Prometheus brutes |
| http://localhost:9090/targets | Cibles Prometheus |
| http://localhost:9090/alerts | Alertes Prometheus |
| http://localhost:9093 | UI Alertmanager |
| http://localhost:3000 | Grafana (`admin` / `admin`) |
| http://localhost:3000/explore | Explore (datasources Prometheus / Loki) |

Arrêt : `docker compose down` — réinitialise tout : `docker compose down -v` (supprime les volumes).

> Le port **3307** accueille MySQL (le port 3306 local est réservé à une éventuelle installation locale).

## Ce qui est en place (carte par carte)

### 1. Conteneurisation
- `Dockerfile` multi-stage `maven:3.9-eclipse-temurin-21` → `eclipse-temurin:21-jre` (JAR → `app.jar`, EXPOSE 8087)
- `docker-compose.yml` : services, volumes nommés (`mysql-data`, `logs`, `loki-data`, `prometheus-data`, `grafana-data`, `alertmanager-data`), réseau interne
- Base seedée par migration Flyway V1-V3 : comptes applicatifs ci-dessous

### 2. Santé & métriques (Actuator)
- Dépendances `spring-boot-starter-actuator` + `micrometer-registry-prometheus`
- Endpoints exposés : `health`, `info`, `metrics`, `prometheus` ; `health` avec Détails (composants `db`, `diskSpace`)
- `SecurityConfig` : accès public aux endpoints `/actuator/health|info|metrics|prometheus`
- Données applicatives taggées (`management.metrics.tags.application`)

### 3. Métriques (Prometheus)
- Job `logitrack-api` → cible `api:8087`, chemin `/actuator/prometheus`, scrape 10s
- Métriques types : `up`, `jvm_memory_used_bytes`, `jvm_threads_live_threads`, `process/system_cpu_usage`, `http_server_requests_seconds_*` (buckets histogrammes)

### 4. Logs (Logback → Loki)
- `logback-spring.xml` : appender CONSOLE permanent + appender ROLLING (fichier) via le profil Spring `logging`
  (`LOG_DIR` configurable, défaut `/tmp/logitrack`, rolling 10 Mo / 7 jours)
- En Docker : `SPRING_PROFILES_ACTIVE=logging`, `LOG_DIR=/logs`, volume partagé `logs` (API → Promtail)
- Promtail lit `/logs/*.log`, extrait le niveau (`INFO`/`WARN`/...) en **label `level`**, pousse vers `loki:3100`

### 5. Visualisation (Grafana)
- Provisioning automatique : datasources **Prometheus** (uid `prometheus`, défaut) et **Loki** (uid `loki`)
- Dashboard **« LogiTrack — Vue d'ensemble »** (uid `logitrack-overview`) : 13 panneaux —
  6 stat (dont latence p95, CPU/heap JVM) + 6 timeseries (req/s, erreurs 5xx, p50/p95, mémoire, CPU, threads) + 1 panneau **Logs (Loki)**
  variable `$job` (valeur par défaut `logitrack-api`)

### 6. Alerting (Prometheus + Alertmanager)
- 4 règles (évaluées toutes les 15 s) dans `docker/prometheus/alert-rules.yml` :

| Alerte | Expression | Seuil |
|---|---|---|
| `LogiTrackApiDown` (critical) | `up{job="logitrack-api"} == 0` | 1 min |
| `LogiTrackHighErrorRate` | taux de réponses HTTP 5xx | > 0,5/s sur 5 min |
| `LogiTrackHighLatency` | p95 des temps de réponse | > 2 s sur 5 min |
| `LogiTrackHighHeapUsage` | heap JVM utilisée / max | > 85 % sur 5 min |

- Alertmanager route `teams-logitrack` → receiver webhook `http://alert-display:9999/alert` (`send_resolved: true`)
- `alert-display` : mini-serveur Python qui imprime dans ses logs chaque notification (idéal pour démontrer le circuit sans SMTP/Slack)

## Validation de bout en bout

```powershell
# 1) Santé & identifiants
Invoke-RestMethod http://localhost:8087/actuator/health                 # UP (db UP, diskSpace UP)
Invoke-RestMethod -Method Post http://localhost:8087/api/auth/login `
  -ContentType "application/json" -Body '{"username":"admin","password":"admin123"}'  # -> token

# 2) Métriques
Invoke-RestMethod "http://localhost:9090/api/v1/query?query=up"         # up{job="logitrack-api"} = 1
Invoke-RestMethod http://localhost:9090/api/v1/rules                    # groupe logitrack-alerts, 4 règles

# 3) Logs
#   Requête LogQL dans Grafana Explore (datasource Loki) :
#     {job="logitrack-logs"}                # tous les logs de LogiTrack
#     {job="logitrack-logs"} |= "WARN"      # seulement les warnings
#   (filtrage par niveau via le label level : {job="logitrack-logs", level="WARN"})

# 4) Grafana
#   http://localhost:3000   ->  "LogiTrack - Vue d'ensemble" : 13 panneaux, données visibles
#   Administration > Data sources : Prometheus et Loki connectés

# 5) Alerting (voir ci-dessous)
```

## Simuler un déclenchement d'alerte

```powershell
docker compose stop api          # l'API devient injoignable
docker compose logs -f alert-display   # dans un 2e terminal : attendre la notification
# après ~1 min (for: 1m) + évaluation : l'alerte LogiTrackApiDown passe PENDING puis FIRING
#   - http://localhost:9090/alerts  : LogiTrackApiDown FIRING
#   - http://localhost:9093         : alerte active
#   - logs alert-display            : payload webhook JSON "status":"firing"
docker compose start api          # redémarre l'API
# l'alerte se résout et alert-display reçoit le webhook "status":"resolved"
```

## Comptes applicatifs (seedés par migration)

| Rôle | Identifiant | Mot de passe |
|---|---|---|
| Admin | `admin` | `admin123` |
| Manager | `manager` | `manager123` |
| Agent | `agent` | `agent123` |

Grafana : `admin` / `admin`.

## Points d'attention connus

- **Loki `:3100/ready` → 503** : comportement normal du *ring* en instance unique ; les requêtes LogQL fonctionnent.
- **API Grafana : `POST /api/login` → 401** : l'authentification API passe par **Basic** (`Authorization: Basic base64(admin:admin)`), qui fonctionne.
- **Alertes `HighErrorRate` / `HighLatency` / `HighHeapUsage`** : inactives sans charge — elles se déclenchent en conditions réelles de charge / incident.

## Arborescence des fichiers ajoutés/modifiés

```
Dockerfile                         # image API multi-stage
.dockerignore
docker-compose.yml                 # la stack (8 services)
docker/
├── prometheus/
│   ├── prometheus.yml             # config (scrape, evaluation, alerting)
│   └── alert-rules.yml            # 4 règles d'alerte
├── alertmanager/alertmanager.yml  # route + receiver webhook
├── alert-display/alert-display.py # récepteur webhook de démo
├── loki/loki-config.yml           # single-binary, TSDB v13
├── promtail/promtail-config.yml   # collecte /logs, label level
└── grafana/
    ├── provisioning/{datasources,dashboards}/*.yml
    └── dashboards/logitrack-overview.json   # 13 panneaux
src/main/resources/
├── logback-spring.xml             # console + fichier roulant (profil logging)
└── application.properties         # exposition Actuator + tags de métriques
```