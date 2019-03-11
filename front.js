var products = [];

$.get('http://localhost:3000', function (response) {
    response.forEach(function (article) {
        new Products(article.name, article.pic, article.price, article.like, article.likeimg);
    });
    clik();
});


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
        this.prodPrice = document.createElement('div');
        this.buyButton = document.createElement('button');
        this.likeButton = document.createElement('img');
    }

    setAtt() {
        this.prodBox.setAttribute('class', 'product');
        this.prodName.setAttribute('class', 'name');
        this.prodPic.setAttribute('class', 'pic');
        this.prodPic.setAttribute('src', this.pic);
        this.prodPrice.setAttribute('class', 'price');
        this.buyButton.setAttribute('class', 'button');
        this.likeButton.setAttribute('src', this.likeImg);
        this.likeButton.setAttribute('class', 'like');
    }

    appendContent() {
        this.container.appendChild(this.prodBox);
        this.prodBox.appendChild(this.prodName);
        this.prodBox.appendChild(this.prodPic);
        this.prodBox.appendChild(this.prodPrice);
        this.prodBox.appendChild(this.buyButton);
        this.prodBox.appendChild(this.likeButton);
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
        el.setAttribute('src', (this.liked ? './images/like.png' : './images/dislike.png'));
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

// let product1_serialised = JSON.stringify(products[0]);
// console.log(product1_serialised);

// localStorage.setItem("product1", product1_serialised);
// console.log(localStorage);

// let product1_deserialized = JSON.parse(localStorage.getItem("product1"));
// console.log(product1_deserialized);

// const CART = {
//     KEY: "tsssssssss",
//     contents: [],
//     //method init, called when the page first load
//     init() {
//         //check localstorage and initialize the contents of cart.contents
//         let _contents = localStorage.getItem(CART.KEY);

//         CART.contents = [Products[0]]
//     }
// }


