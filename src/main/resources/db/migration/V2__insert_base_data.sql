-- V2 : Donnees de base (utilisateurs + premieres donnees)
-- Comptes de test : admin / manager / agent (mot de passe = login + "123")

INSERT INTO users (nom, prenom, email, username, password, role) VALUES
('Admin',   'LogiTrack', 'admin@logitrack.com',   'admin',   '$2a$10$45RIi38imkv3j3OA.uvFgeXQiLu351dAJY.lq2snHnsR6cWI4q3Na', 'ADMIN'),
('Manager', 'LogiTrack', 'manager@logitrack.com', 'manager', '$2a$10$72f3RmR4araSBRXZLZepket1O03dlZlsO2HSXvAgMhnItDiMSDtZq', 'MANAGER'),
('Agent',   'LogiTrack', 'agent@logitrack.com',   'agent',   '$2a$10$azQq/j53.Udln92tXMVnCeVXX2euLDn8Us2YE0koSaZ7hJReOqaj.', 'AGENT');

INSERT INTO client (id, nom, email, telephone, ville) VALUES
(3, 'Omar Alaoui',  'omar.alaoui@email.com',  '0611111111', 'Marrakech'),
(4, 'Fatima Zahra', 'fatima.zahra@email.com', '0622222222', 'Fes'),
(5, 'Mehdi Benali', 'mehdi.benali@email.com', '0633333333', 'Agadir');

INSERT INTO produit (id, nom, categorie, prix, quantite_stock) VALUES
(1, 'Ordinateur Portable HP', 'Informatique', 4500.00, 25),
(2, 'iPhone 15',              'Telephonie',   9800.00, 15),
(3, 'Chaise Bureau',          'Mobilier',     1200.00, 40),
(4, 'Tablette Samsung',       'Telephonie',   3200.00, 3),
(5, 'Imprimante Canon',       'Informatique', 1500.00, 2),
(6, 'Cle USB 128GB',          'Accessoires',  150.00, 100);

INSERT INTO commande (id, date_commande, statut, client_id) VALUES
(2, '2026-07-10', 'LIVREE',          3),
(3, '2026-07-20', 'EXPEDIEE',        3),
(4, '2026-07-25', 'EN_PREPARATION',  4),
(5, '2026-08-01', 'NOUVELLE',        5);

INSERT INTO ligne_commande (id, quantite, commande_id, produit_id) VALUES
(1, 2, 2, 1),
(2, 5, 2, 6),
(3, 1, 3, 4),
(4, 4, 4, 3),
(5, 1, 5, 5),
(6, 1, 5, 2);
