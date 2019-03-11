var products = [];

//récupération des articles de la bdd et creation des instances de la classe Products pour chaque élément de l'array response
//requête tous les articles de la table Article
$.get('http://localhost:3000', function (response) {
    response.forEach(function (article) {
        new Products(article.name, article.pic, article.price, article.like, article.likeimg);
    });
    clik();
});


//fonction pour requete accueil et update contenu
$('#homepage').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});


//fonction pour requete gender femme et update contenu
$('#genderbtn1').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/women', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//fonction pour requete gender homme et update contenu
$('#genderbtn2').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/men', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//fonction pour requete tshirt et update contenu
$('#tshirtbtn').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/tshirt', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//fonction pour requete trouser et update contenu
$('#trouserbtn').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/trouser', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//fonction pour requete shoe et update contenu
$('#shoebtn').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/shoe', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//fonction pour requete accessory et update contenu
$('#accessorybtn').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";
    $.get('http://localhost:3000/accessory', function (response) {
        console.log(response);
        response.forEach(function (article) {
            new Products(article.name, article.pic, article.price, article.like, article.likeimg);
        });

        clik();
    });
});

//initialisation - création class Products et display html
class Products {
    constructor(name, pic, price, liked, likeImg) {
        this.name = name;
        this.pic = pic;
        this.price = price;
        this.liked = liked;
        this.likeImg = likeImg;
        this.container = document.getElementById("container");
        this.createEl();
        this.setAtt();
        this.appendContent();
        this.insertContent();
        products.push(this);
    }

    createEl() {
        this.prodBox = document.createElement('div');
        this.prodName = document.createElement('h5');
        this.prodPic = document.createElement('img');
        this.prodDivBottom = document.createElement('div');
        this.prodPrice = document.createElement('span');
        this.buyButton = document.createElement('button');
        this.likeButton = document.createElement('img');
    }

    setAtt() {
        this.prodBox.setAttribute('class', 'product');
        this.prodName.setAttribute('class', 'name');
        this.prodPic.setAttribute('class', 'pic');
        this.prodPic.setAttribute('src', this.pic);
        this.prodDivBottom.setAttribute('class','bottom')
        this.prodPrice.setAttribute('class', 'price');
        this.buyButton.setAttribute('class', 'button');
        this.likeButton.setAttribute('src', this.likeImg);
        this.likeButton.setAttribute('class', 'like');
    }

    appendContent() {
        this.container.appendChild(this.prodBox);
        this.prodBox.appendChild(this.prodName);
        this.prodBox.appendChild(this.prodPic);
        this.prodBox.appendChild(this.prodDivBottom)
        this.prodDivBottom.appendChild(this.prodPrice);
        this.prodDivBottom.appendChild(this.buyButton);
        this.prodDivBottom.appendChild(this.likeButton);
    }

    insertContent() {
        this.prodName.innerHTML = this.name;
        this.prodPic.innerHTML = this.pic;
        this.prodPrice.innerHTML = this.price + '€';
        this.buyButton.innerHTML = "Ajouter au panier";
    }

    buy() {
        console.log("j'achete " + this.name);
    }
    like(el) {
        this.liked = !this.liked;
        el.setAttribute('src', (this.liked ? 'images/Icons/like.png' : 'images/Icons/dislike.png'));
    }
}

//ajout event sur le bouton 'Ajouter au panier' et sur le 'like'
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



