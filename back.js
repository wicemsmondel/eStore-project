const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const dbFile = 'store.db';
const db = new sqlite3.Database(dbFile);

db.serialize(() => {
    
    db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,  name TEXT, pic URL, price INTEGER , like BOOLEAN, likeimg URL)');
    

    // db.run('INSERT INTO products(name, pic, price, like, likeimg) VALUES(?, ?, ?, ?, ?)', 'Mi-Pac - Sac banane assoupli - Noir', './images/sac_banane_cuir.jpg', 50, true, './images/dislike.png');
    // db.run('INSERT INTO products(name, pic, price, like, likeimg) VALUES(?, ?, ?, ?, ?)', 'Crooked Tongues - T-shirt court oversize', './images/tshirt_black.jpg', 30, false, './images/dislike.png');
    // db.run('INSERT INTO products(name, pic, price, like, likeimg) VALUES(?, ?, ?, ?, ?)', 'Fila - Disruptor II Premium', './images/basket_fila_gold.jpg', 150, false, './images/dislike.png');

});

app.get('/', function (request, response) {
    db.all('SELECT * FROM products', function (error, data) {
        response.send(data);
    });
});

// app.get('/', function (request, response) {
//     db.all('SELECT * FROM products', function (error, data) {
//         response.send(data);
//     });
// });


app.listen(3000, function (error) {
    if (!error) console.log("app listening port 3000");
});

