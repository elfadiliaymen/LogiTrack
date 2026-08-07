-- V1 : Creation du schema (conforme aux entites JPA)
-- Users (User), Client, Produit, Commande, LigneCommande

CREATE TABLE users (
    id       BIGINT       NOT NULL AUTO_INCREMENT,
    nom      VARCHAR(255) NOT NULL,
    prenom   VARCHAR(255) NOT NULL,
    email    VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role     VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_email (email)
) ENGINE=InnoDB;

CREATE TABLE client (
    id        BIGINT NOT NULL AUTO_INCREMENT,
    nom       VARCHAR(255),
    email     VARCHAR(255),
    telephone VARCHAR(255),
    ville     VARCHAR(255),
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE produit (
    id             BIGINT NOT NULL AUTO_INCREMENT,
    nom            VARCHAR(255),
    categorie      VARCHAR(255),
    prix           DOUBLE,
    quantite_stock INT,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE commande (
    id            BIGINT NOT NULL AUTO_INCREMENT,
    date_commande DATE,
    statut        VARCHAR(255),
    client_id     BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_commande_client FOREIGN KEY (client_id) REFERENCES client (id)
) ENGINE=InnoDB;

CREATE TABLE ligne_commande (
    id          BIGINT NOT NULL AUTO_INCREMENT,
    quantite    INT,
    commande_id BIGINT,
    produit_id  BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_ligne_commande_commande FOREIGN KEY (commande_id) REFERENCES commande (id),
    CONSTRAINT fk_ligne_commande_produit  FOREIGN KEY (produit_id)   REFERENCES produit (id)
) ENGINE=InnoDB;
