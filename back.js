const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.port || 3000;

const dbFile = 'store.db';
const db = new sqlite3.Database(dbFile);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.serialize(() => {
    //création de la table des catégories d'articles
    db.run('CREATE TABLE IF NOT EXISTS Category (category_id INTEGER PRIMARY KEY AUTOINCREMENT,  category_name TEXT UNIQUE)');

    db.run('INSERT INTO Category (category_name) VALUES(?)', 'shirt');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'tshirt');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'shoe');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'trouser');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'dress');
    db.run('INSERT INTO Category (category_name) VALUES(?)', 'accessory');


    //création de la table des marques
    db.run('CREATE TABLE IF NOT EXISTS Brand (brand_id INTEGER PRIMARY KEY AUTOINCREMENT,  brand_name TEXT UNIQUE)');

    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'BALENCIAGA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'GUCCI');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'SAINT LAURENT');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'DOLCE & GABBANA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'DIOR');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'BILLION NY');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'HOUSE OF BORGERIE');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'FILA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'ZARA');
    db.run('INSERT INTO Brand (brand_name) VALUES(?)', 'MANGO');

    //création de la table des clients
    db.run('CREATE TABLE IF NOT EXISTS Client (client_id INTEGER PRIMARY KEY AUTOINCREMENT,  client_firstname TEXT , client_name TEXT , client_mail TEXT , client_password TEXT , gender_id INTEGER)');

    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Rachel',' Green','exemple@gmail.com', 'mdp', 1);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Monica', 'Geller','exemple@gmail.com', 'mdp', 1);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Phoebe', 'Buffay','exemple@gmail.com', 'mdp', 1);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Joey', 'Tribiani','exemple@gmail.com', 'mdp', 2);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Chandler', 'Bing','exemple@gmail.com', 'mdp', 2);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', 'Ross', 'Geller','exemple@gmail.com', 'mdp', 2);



    //création de la table des articles
    db.run('CREATE TABLE IF NOT EXISTS Article (article_id INTEGER PRIMARY KEY AUTOINCREMENT,  name TEXT UNIQUE, pic URL, price INTEGER , like BOOLEAN, likeimg URL, category_id INTEGER, brand_id INTEGER, gender_id INTEGER, FOREIGN KEY (category_id) REFERENCES Category(category_id), FOREIGN KEY (brand_id) REFERENCES Brand(brand_id),FOREIGN KEY (gender_id) REFERENCES Gender(gender_id))');

    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Mi-Pac - Sac banane assoupli - Noir', 'images/Accessories/sac_banane_cuir.jpg', 50, true, './images/Icons/dislike.png', 6, 10, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Crooked Tongues - T-shirt court oversize', 'images/Tshirts/tshirt_black.jpg', 30, false, './images/Icons/dislike.png', 2, 9, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Fila - Disruptor II Premium', 'images/Shoes/basket_fila_gold.jpg', 150, false, './images/Icons/dislike.png', 3, 8, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Balenciaga - Triple S', 'images/Shoes/balenciaga triple s.jpg', 725, false, './images/Icons/dislike.png', 3, 1, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Gucci - Baskets Flashtrek avec cristaux amovibles', 'images/Shoes/basket Gucci.jpg', 1200, false, './images/Icons/dislike.png', 3, 2, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Balenciaga - Crocs à plateforme en caoutchouc', 'images/Shoes/crocs balenciaga.jpg', 650, false, './images/Icons/dislike.png', 3, 1, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'YSL - Opyum escarpins à talon noir en cuir verni', 'images/Shoes/YSL escarpins.jpg', 950, false, './images/Icons/dislike.png', 3, 3, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'D&G - SNEAKERS PORTOFINO CUIR DE VEAU AVEC ÉCUSSON', 'images/Shoes/d&g sneakers.webp', 895, false, './images/Icons/dislike.png', 3, 4, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Dior - Sneaker toile et veau noirs, rouges et jaunes', 'images/Shoes/dior basket.jpg', 820, false, './images/Icons/dislike.png', 3, 5, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'YSL - Robe bustier plissée en suède - étoiles en cuir', 'images/Dresses/YSL - Robe bustier plissée en suède orné d étoiles en cuir_6900.jpg', 6900, false, './images/Icons/dislike.png', 5, 3, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'YSL - Robe 60s en jersay de laine et détails strass', 'images/Dresses/YSL - Robe 60s en jersay de laine et détails strass_2990.jpg', 2990, false, './images/Icons/dislike.png', 5, 3, 1);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'D&G - Sac à dos Panda en fausse fourrure', 'images/Accessories/D&G - Sac à dos Panda en fausse fourrure.webp', 895, false, './images/Icons/dislike.png', 6, 4, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'D&G - Sac à dos Leopard en fausse fourrure', 'images/Accessories/D&G - Sac à dos Leopard en fausse fourrure.webp', 895, false, './images/Icons/dislike.png', 6, 4, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Gucci - Pantalon de jogging en chenille', 'images/Trousers/Gucci - Pantalon de jogging en chenille.jpg', 950, false, './images/Icons/dislike.png', 4, 6, 2);
    db.run('INSERT INTO Article (name, pic, price, like, likeimg, category_id, brand_id, gender_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'Gucci - Light-Pantalon-lgant-en-velours', 'images/Trousers/Gucci - Light-Pantalon-lgant-en-velours.jpg', 680, false, './images/Icons/dislike.png', 4, 6, 2);

    //création de la table de jointure Achats (client <-> articles) 
    db.run('CREATE TABLE IF NOT EXISTS Achats (achat_id INTEGER PRIMARY KEY AUTOINCREMENT,  client_id INTEGER , article_id INTEGER, FOREIGN KEY (client_id) REFERENCES Client(client_id), FOREIGN KEY (article_id) REFERENCES Article(article_id))');
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 1, 1);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 1, 2);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 2, 3);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 1);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 2);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 3, 3);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 4, 2);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 6, 3);
    db.run('INSERT INTO Achats (client_id, article_id) VALUES (?,?)', 5, 1);

});

//ecoute le serveur
app.listen((port), function (error) {
    if (!error) console.log("app listening port " + port);
});


//requete de base pour sélectionner tous les articles
app.get('/', function (request, response) {
    db.all('SELECT name, pic, price, like, likeimg FROM Article', function (error, data) {
        response.send(data);
    });
});

//requete gender femme
app.get('/women', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.gender_id=1;', function (error, data) {
        response.send(data);
    });
});

//requete gender homme
app.get('/men', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.gender_id=2;', function (error, data) {
        response.send(data);
    });
});

//requete category shirt
app.get('/tshirt', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.category_id=2;', function (error, data) {
        response.send(data);
    });
});

//requete category trouser
app.get('/trouser', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.category_id=4;', function (error, data) {
        response.send(data);
    });
});

//requete category shoe
app.get('/shoe', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.category_id=3;', function (error, data) {
        response.send(data);
    });
});

//requete category accessory
app.get('/accessory', function (request, response) {
    db.all('SELECT * FROM Article WHERE Article.category_id=6;', function (error, data) {
        response.send(data);
    });
})

// //requete client pour BDD UPDATE
// app.get('/clients', function (request,response){
//     db.all('SELECT * FROM Client;', function (error, data){
//         response.send(data);
//     });
// });

//Creation de la route
// app.post('/client', function (request, response) {
//     console.log(request.body)
//     //request.body pour récupéré la valeur envoyé par le Front et l'inséré dans la BDD
//     db.run('INSERT INTO  Client (client_name) VALUES (?)',
//         resquest.body.caca,
//         function (error, data) {
//             response.send(request.body.client_name);
//         });
// });

app.post('/clients', function (request, response) {
    console.log(request.body.client_name);
    db.run('INSERT INTO Client (client_firstname, client_name, client_mail, client_password, gender_id) VALUES(?, ?, ? , ?, ?)', request.body.client_firstname , request.body.client_name, request.body.client_mail, request.body.client_password, request.body.gender_id);
    // response.send(data);
})

app.post('/:search_input', function (request, response) {
    if (request.body.searchreq === "homme") {
        db.all('SELECT * FROM Article WHERE Article.gender_id=2;', function (error, data) {
            response.send(data);
        });
    } else if (request.params.search_input === "femme") {
        db.all('SELECT * FROM Article WHERE Article.gender_id=1;', function (error, data) {
            response.send(data);
        });
    }
});