var products = [];

for (i = 0; i < 4; i++) {
    $('.nav' + i).click(function (el) {
        console.log(el.target.innerHTML);
        document.getElementById("container").innerHTML = "";
        $.get('http://localhost:3000/category/' + el.target.innerHTML, function (response) {
            console.log(response);
            response.forEach(function (article) {
                new Products(article.name, article.pic, article.price, article.like, article.likeimg);
            });
            clik();
        });
    });
}

for (i = 1; i < 3; i++) {
    $('.genre' + i).click(function (el) {
        console.log(el.target.innerHTML);
        document.getElementById("container").innerHTML = "";
        $.get('http://localhost:3000/' + el.target.innerHTML, function (response) {
            console.log(response);
            response.forEach(function (article) {
                new Products(article.name, article.pic, article.price, article.like, article.likeimg);
            });
            clik();
        });
    });
}

//requête retour page
$('#logo').click(function () {
    var container = document.getElementById("container");
    container.innerHTML = "";

});

//fonction pour requete tous les articles
$('#all').click(function () {
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


function newClient() {
    var client_name = document.querySelector('#client_name').value;
    var client_firstname = document.querySelector('#client_firstname').value;
    var client_mail = document.querySelector('#client_mail').value;
    var client_password = document.querySelector('#client_password').value;
    $.post('http://localhost:3000/clients',
        {
            client_name: client_name,
            client_firstname: client_firstname,
            client_mail: client_mail,
            client_password: client_password,
        },
        function (response) {
            console.log(response);
        });
}

function send() {
    const search_input = document.getElementById('searchreq').value;
    console.log(search_input);

    $.post('http://localhost:3000/' + search_input,
        { searchreq: search_input },
        function (response) {
            console.log(response);
            container.innerHTML = "";
            response.forEach(function (article) {
                new Products(article.name, article.pic, article.price, article.like, article.likeimg);
            });
            clik();
        });
}

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
        this.prodDivBottom.setAttribute('class', 'bottom')
        this.prodPrice.setAttribute('class', 'price');
        this.buyButton.setAttribute('class', 'buyButton');
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
    var buyButton = document.getElementsByClassName("buyButton");
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

//Effet de la navbar au scroll
$(window).on("scroll", function () {
    if ($(window).scrollTop()) {
        $('nav').addClass('black');
    }
    else {
        $('nav').removeClass('black');
    }
})

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}