# ---- Stage 1 : compilation Maven ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Cache des dependances Maven (layer separe : ne se reconstruit que si pom.xml change)
COPY pom.xml .
RUN mvn -q -B dependency:resolve dependency:resolve-plugins

# Compilation + packaging
COPY src ./src
RUN mvn -q -B -DskipTests package

# ---- Stage 2 : image d'execution (JRE uniquement) ----
FROM eclipse-temurin:21-jre
WORKDIR /app

# Jar Spring Boot
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8087

ENTRYPOINT ["java", "-jar", "/app/app.jar"]