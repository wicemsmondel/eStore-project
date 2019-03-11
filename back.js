const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const dbFile = 'store.db';
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    //création de la table des catégories d'articles
    db.run('CREATE TABLE IF NOT EXISTS Category (category_id INTEGER PRIMARY KEY AUTOINCREMENT,  category_name TEXT UNIQUE)');

    db.run('INSERT INTO Category (category_name) VALUES(?)', 'chemise');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'tshirt');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'chaussure');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'pantalon');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'robe');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'accessoire');

    //création de la table des marques
    db.run('CREATE TABLE IF NOT EXISTS Brand (brand_id INTEGER PRIMARY KEY AUTOINCREMENT,  brand_name TEXT UNIQUE)');

    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'BALENCIAGA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'GUCCI');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'SAINT LAURENT');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'DOLCE & GABANA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'DIOR');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'BILLION NY');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'HOUSE OF BORGERIE');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'FILA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'ZARA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'MANGO');

    //création de la table des clients
    db.run('CREATE TABLE IF NOT EXISTS Client (client_id INTEGER PRIMARY KEY AUTOINCREMENT,  client_name TEXT UNIQUE)');

    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Rachel Green');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Monica Geller');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Phoebe Buffay');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Joey Tribiani');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Chandler Bing');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Ross Geller');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Jessica Day');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Nicholas Miller');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Winston Schmidt');
    db.run('INSERT INTO Client (client_name) VALUES(?)', 'Winston Bishop');

    //création de la table des articles
    db.run('CREATE TABLE IF NOT EXISTS Article (article_id INTEGER PRIMARY KEY AUTOINCREMENT,  name TEXT UNIQUE, pic URL, price INTEGER , like BOOLEAN, likeimg URL, category_id INTEGER, brand_id INTEGER, FOREIGN KEY (category_id) REFERENCES Category(category_id), FOREIGN KEY (brand_id) REFERENCES Brand(brand_id))');

    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Mi-Pac - Sac banane assoupli - Noir', 'images/sac_banane_cuir.jpg', 50, true, './images/dislike.png', 6, 10);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Crooked Tongues - T-shirt court oversize', 'images/tshirt_black.jpg', 30, false, './images/dislike.png', 2, 9);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Fila - Disruptor II Premium', 'images/basket_fila_gold.jpg', 150, false, './images/dislike.png', 3, 8);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Balenciaga - Triple S', 'images/balenciaga triple s.jpg', 725, false, './images/dislike.png', 3, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Gucci - Baskets Flashtrek avec cristaux amovibles', 'images/basket Gucci.jpg', 1200, false, './images/dislike.png', 3, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Balenciaga - Crocs à plateforme en caoutchouc', 'images/crocs balenciaga.jpg', 650, false, './images/dislike.png', 3, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'YSL - Opyum escarpins à talon noir en cuir verni', 'images/YSL escarpins.jpg', 950, false, './images/dislike.png', 3, 3);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'YSL - MEURICE Botte en suède et clous', 'images/YSL botte.jpg', 10000, false, './images/dislike.png', 3, 3);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'D&G - SNEAKERS PORTOFINO CUIR DE VEAU AVEC ÉCUSSON', 'images/d&g sneakers.webp', 895, false, './images/dislike.png', 3, 4);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id) VALUES(?, ?, ?, ?, ?, ?, ?)', 'Dior - Sneaker toile et veau noirs, rouges et jaunes', 'images/dior basket.jpg', 820, false, './images/dislike.png', 3, 5);

    //création de la table de jointure Achats (client <-> articles) 
    // db.run('CREATE TABLE IF NOT EXISTS Achats (achat_id INTEGER PRIMARY KEY AUTOINCREMENT,  client_id INTEGER , article_id INTEGER, FOREIGN KEY (client_id) REFERENCES Client(client_id), FOREIGN KEY (article_id) REFERENCES Article(article_id))');
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 1, 1);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 1, 2);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 2, 3);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 1);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 2);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 3);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 4, 2);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 7, 3);
    // db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 9, 1);

    // requêtes
    // db.all('SELECT * FROM Article NATURAL JOIN Category', function (error, data) {
    //     if (!error) console.log(data);
    //     else console.log(error);
    // });

    // db.all('SELECT * FROM Article NATURAL JOIN Category NATURAL JOIN Brand', function (error, data) {
    //     if (!error) console.log(data);
    //     else console.log(error);
    // });

    // db.all('SELECT * FROM Article NATURAL JOIN Achats NATURAL JOIN Client NATURAL JOIN Brand NATURAL JOIN Category', function (error, data) {
    //     if (!error) console.log(data);
    //     else console.log(error);
    // });

    // db.all('SELECT name, pic, price, like, likeimg FROM Article', function (error, data) {
    //     if (!error) console.log(data);
    //     else console.log(error);
    // });
});


app.get('/', function (request, response) {
    db.all('SELECT name, pic, price, like, likeimg FROM Article', function (error, data) {
        response.send(data);
    });
});


app.listen(3000, function (error) {
    if (!error) console.log("app listening port 3000");
});

    // db.all('SELECT name, price, like FROM products', function (error, data) {

    //     if (!error) console.log(data);
    //     else console.log(error);
    // });

    // db.all('SELECT name FROM products', function (error, data) {

    //     if (!error) console.log(data);
    //     else console.log(error);
    // });

    // db.all('SELECT like FROM products WHERE like = true', function (error, data) {

    //     if (!error) console.log(data);
    //     else console.log(error);
    // });