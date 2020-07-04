
var cardList = document.getElementById('card-list');
var btnPlaceOrder = document.getElementById('btn-place-order');
var openNav = document.getElementById("open-menu");
var closeNav = document.getElementById("closebtn")

openNav.addEventListener('click', function () {
    document.getElementById('mySidenav').style.width = "250px";
});


closeNav.addEventListener('click', function () {
    document.getElementById('mySidenav').style.width = "0px";
});


var productList = window.localStorage.getItem('product-list');
productList = productList === null || productList === '' ? [] : productList;
productList = productList.length > 0 ? JSON.parse(productList) : [];
document.getElementById('item-count').innerHTML = productList.length;


// console.log(productList);
var grandTotal = 0;
for (var i = 0; i < productList.length; i++) {
    cardList.appendChild(createCheckoutProductCard(productList[i]));
    var totalForCurrentProduct = parseFloat(productList[i].count) * parseFloat(productList[i].price);

    grandTotal = grandTotal + totalForCurrentProduct;
    document.getElementById('total-amount').innerHTML = grandTotal;

}


function createCheckoutProductCard(data) {
    console.log(data);
    var cardDiv = document.createElement('div');
    cardDiv.classList.add('checkout-card');
    var div = document.createElement('div');
    var divImg = document.createElement('img');
    divImg.classList.add("checkout-product-img");
    divImg.src = data.preview;
    div.appendChild(divImg);
    cardDiv.appendChild(div);
    var itemDiv = document.createElement('div');
    var itemHeading = document.createElement('h4');
    itemHeading.innerHTML = data.name;
    itemDiv.appendChild(itemHeading);

    var itemPara = document.createElement('p');
    itemPara.innerHTML = 'x' + data.count;
    itemDiv.appendChild(itemPara);

    var itemPrice = document.createElement('p');
    var priceSpan = document.createElement('span');
    priceSpan.innerHTML = "Amount: Rs";
    var spanAmt = document.createElement('span');
    spanAmt.innerHTML = data.price;
    itemPrice.appendChild(priceSpan);
    itemPrice.appendChild(spanAmt);
    itemDiv.appendChild(itemPrice);
    cardDiv.appendChild(itemDiv);
    return cardDiv;

}

btnPlaceOrder.addEventListener('click', function () {
    var orderItemArray = [];
    for (var i = 0; i < productList.length; i++) {
        var prodObj = {
            "id": productList[i].id,
            "brand": productList[i].brand,
            "name": productList[i].name,
            "price": productList[i].price,
            "preview": productList[i].preview,
            "isAccessory": productList[i].isAccessory
        }

        orderItemArray.push(prodObj);
    }
    var dataObj = {
        amount: grandTotal,
        products: orderItemArray
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open('POST', "https://5ef6537f2c0f2c00169499fb.mockapi.io/Order", dataObj, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhttp.send(JSON.stringify(dataObj));
    xhttp.onreadystatechange = function () {

        if (xhttp.readyState === 4) {
            alert('Order Placed Successfully');
            localStorage.setItem('product-list', []);
            location.assign('./thankyou.html');


        }
    }

});

