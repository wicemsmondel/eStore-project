

$.get('http://localhost:3000', function (response) {
    response.forEach(function (prod) {
        new Products(prod.name, prod.pic, prod.price, prod.like, prod.likeimg);
    });
    createHtml();
    clik();
});
var products = [];

var container = document.getElementById("container");


class Products {
    constructor(name, pic, price, liked, heart) {
        this.name = name;
        this.pic = pic;
        this.price = price;
        this.liked = liked;
        this.heart = heart;
        products.push(this);
    }
    
    buy() {
        console.log("j'achete " + this.name);
    }
    like(el) {
        this.liked = !this.liked;
        el.setAttribute('src', (this.liked? './images/like.png': './images/dislike.png'));
    }

}

function createHtml() {
    for (let i = 0; i < products.length; i++) {
        var prodItem = document.createElement('div');
        prodItem.setAttribute('class', 'product');
        container.appendChild(prodItem);

        var prodName = document.createElement('h5');
        var prodPic = document.createElement('img');
        var prodPrice = document.createElement('div');
        var buyButton = document.createElement('button');
        var likeButton = document.createElement('img');

        prodName.setAttribute('class', 'name');
        prodPic.setAttribute('class', 'pic');
        prodPic.setAttribute('src', products[i].pic);
        prodPrice.setAttribute('class', 'price');
        buyButton.setAttribute('class', 'button');
        likeButton.setAttribute('src', products[i].heart);
        likeButton.setAttribute('class', 'like');

        prodName.innerHTML = products[i].name;
        prodPic.innerHTML = products[i].pic;
        prodPrice.innerHTML = products[i].price + '€';
        buyButton.innerHTML = "Ajouter au panier";

        prodItem.appendChild(prodName);
        prodItem.appendChild(prodPic);
        prodItem.appendChild(prodPrice);
        prodItem.appendChild(buyButton);
        prodItem.appendChild(likeButton);
    }
}

function clik() {

    var buyButton = document.getElementsByClassName("button");

    for (let i = 0; i < products.length; i++) {
        buyButton[i].addEventListener("click", function () {
            products[i].buy();
        })
    }

    var likeButton = document.getElementsByClassName("like");

    for (let i = 0; i < products.length; i++) {
        likeButton[i].addEventListener("click", function (e) {
            products[i].like(e.target);
        })
    }

}

