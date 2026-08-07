-- V3 : Donnees de test pour le tableau de bord
-- Les PK sont laisses a l'auto-increment MySQL et les FK sont resolues
-- par sous-requetes (email client / nom produit / statut+date commande)
-- pour eviter tout conflit avec les donnees deja presentes en base.

-- Clients
INSERT INTO client (nom, email, telephone, ville) VALUES
('Yasmine El Idrissi', 'yasmine.elidrissi@email.com', '0644444444', 'Casablanca'),
('Karim Bennis',       'karim.bennis@email.com',     '0655555555', 'Rabat'),
('Salma Tazi',         'salma.tazi@email.com',       '0666666666', 'Tanger'),
('Youssef Amrani',     'youssef.amrani@email.com',   '0677777777', 'Oujda'),
('Nadia Chraibi',      'nadia.chraibi@email.com',    '0688888888', 'Kenitra'),
('Hicham El Fassi',    'hicham.elfassi@email.com',   '0699999999', 'Casablanca'),
('Laila Benkirane',    'laila.benkirane@email.com',  '0611122233', 'Fes'),
('Anas Berrada',       'anas.berrada@email.com',     '0611122244', 'Marrakech');

-- Produits : 3 a stock faible (< 5) -> Tablette Lenovo=2, Imprimante Epson=1, Ecran Samsung=0
INSERT INTO produit (nom, categorie, prix, quantite_stock) VALUES
('Ecran Dell 27 pouces',       'Informatique', 2100.00, 12),
('Souris Logitech',            'Accessoires',  250.00, 60),
('Clavier Mecanique',          'Accessoires',  450.00, 35),
('Casque Audio Sony',          'Accessoires',  900.00, 8),
('Tablette Lenovo',            'Telephonie',   2800.00, 2),
('Imprimante Epson',           'Informatique', 1700.00, 1),
('Ecran Samsung 32 pouces',    'Informatique', 3200.00, 0),
('Bureau en Bois',             'Mobilier',     2400.00, 7),
('Etagere Metallique',         'Mobilier',     850.00, 20),
('Disque Dur Externe 1TB',     'Accessoires',  700.00, 5);

-- Commandes : 3 NOUVELLE, 3 EXPEDIEE, 3 LIVREE
INSERT INTO commande (date_commande, statut, client_id) VALUES
('2026-07-15', 'NOUVELLE', (SELECT id FROM client WHERE email = 'yasmine.elidrissi@email.com')),
('2026-07-18', 'NOUVELLE', (SELECT id FROM client WHERE email = 'karim.bennis@email.com')),
('2026-07-22', 'NOUVELLE', (SELECT id FROM client WHERE email = 'salma.tazi@email.com')),
('2026-07-28', 'EXPEDIEE', (SELECT id FROM client WHERE email = 'youssef.amrani@email.com')),
('2026-07-30', 'EXPEDIEE', (SELECT id FROM client WHERE email = 'nadia.chraibi@email.com')),
('2026-08-01', 'EXPEDIEE', (SELECT id FROM client WHERE email = 'hicham.elfassi@email.com')),
('2026-08-02', 'LIVREE',   (SELECT id FROM client WHERE email = 'laila.benkirane@email.com')),
('2026-08-04', 'LIVREE',   (SELECT id FROM client WHERE email = 'anas.berrada@email.com')),
('2026-08-06', 'LIVREE',   (SELECT id FROM client WHERE email = 'yasmine.elidrissi@email.com'));

-- Lignes de commande : "Ecran Dell 27 pouces" totalise 15 unites -> produit le plus commande
INSERT INTO ligne_commande (quantite, commande_id, produit_id) VALUES
(3, (SELECT c.id FROM commande c WHERE c.statut='NOUVELLE' AND c.date_commande='2026-07-15' AND c.client_id=(SELECT id FROM client WHERE email='yasmine.elidrissi@email.com')), (SELECT id FROM produit WHERE nom='Ecran Dell 27 pouces')),
(2, (SELECT c.id FROM commande c WHERE c.statut='NOUVELLE' AND c.date_commande='2026-07-15' AND c.client_id=(SELECT id FROM client WHERE email='yasmine.elidrissi@email.com')), (SELECT id FROM produit WHERE nom='Souris Logitech')),
(4, (SELECT c.id FROM commande c WHERE c.statut='NOUVELLE' AND c.date_commande='2026-07-18' AND c.client_id=(SELECT id FROM client WHERE email='karim.bennis@email.com')),     (SELECT id FROM produit WHERE nom='Ecran Dell 27 pouces')),
(1, (SELECT c.id FROM commande c WHERE c.statut='NOUVELLE' AND c.date_commande='2026-07-22' AND c.client_id=(SELECT id FROM client WHERE email='salma.tazi@email.com')),      (SELECT id FROM produit WHERE nom='Clavier Mecanique')),
(2, (SELECT c.id FROM commande c WHERE c.statut='NOUVELLE' AND c.date_commande='2026-07-22' AND c.client_id=(SELECT id FROM client WHERE email='salma.tazi@email.com')),      (SELECT id FROM produit WHERE nom='Disque Dur Externe 1TB')),
(2, (SELECT c.id FROM commande c WHERE c.statut='EXPEDIEE' AND c.date_commande='2026-07-28' AND c.client_id=(SELECT id FROM client WHERE email='youssef.amrani@email.com')),    (SELECT id FROM produit WHERE nom='Casque Audio Sony')),
(1, (SELECT c.id FROM commande c WHERE c.statut='EXPEDIEE' AND c.date_commande='2026-07-28' AND c.client_id=(SELECT id FROM client WHERE email='youssef.amrani@email.com')),    (SELECT id FROM produit WHERE nom='Tablette Lenovo')),
(5, (SELECT c.id FROM commande c WHERE c.statut='EXPEDIEE' AND c.date_commande='2026-07-30' AND c.client_id=(SELECT id FROM client WHERE email='nadia.chraibi@email.com')),      (SELECT id FROM produit WHERE nom='Ecran Dell 27 pouces')),
(1, (SELECT c.id FROM commande c WHERE c.statut='EXPEDIEE' AND c.date_commande='2026-08-01' AND c.client_id=(SELECT id FROM client WHERE email='hicham.elfassi@email.com')),     (SELECT id FROM produit WHERE nom='Imprimante Epson')),
(1, (SELECT c.id FROM commande c WHERE c.statut='EXPEDIEE' AND c.date_commande='2026-08-01' AND c.client_id=(SELECT id FROM client WHERE email='hicham.elfassi@email.com')),     (SELECT id FROM produit WHERE nom='Ecran Samsung 32 pouces')),
(2, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-02' AND c.client_id=(SELECT id FROM client WHERE email='laila.benkirane@email.com')),      (SELECT id FROM produit WHERE nom='Bureau en Bois')),
(3, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-02' AND c.client_id=(SELECT id FROM client WHERE email='laila.benkirane@email.com')),      (SELECT id FROM produit WHERE nom='Etagere Metallique')),
(3, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-04' AND c.client_id=(SELECT id FROM client WHERE email='anas.berrada@email.com')),         (SELECT id FROM produit WHERE nom='Ecran Dell 27 pouces')),
(3, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-04' AND c.client_id=(SELECT id FROM client WHERE email='anas.berrada@email.com')),         (SELECT id FROM produit WHERE nom='Souris Logitech')),
(2, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-06' AND c.client_id=(SELECT id FROM client WHERE email='yasmine.elidrissi@email.com')),    (SELECT id FROM produit WHERE nom='Clavier Mecanique')),
(1, (SELECT c.id FROM commande c WHERE c.statut='LIVREE' AND c.date_commande='2026-08-06' AND c.client_id=(SELECT id FROM client WHERE email='yasmine.elidrissi@email.com')),    (SELECT id FROM produit WHERE nom='Disque Dur Externe 1TB'));
