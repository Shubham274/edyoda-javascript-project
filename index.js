var clothingGrid = document.getElementById('clothing-grid');
var accessoryGrid = document.getElementById('accessory-grid');
var openNav = document.getElementById("open-menu");
var closeNav = document.getElementById("closebtn")

openNav.addEventListener('click', function () {
    document.getElementById('mySidenav').style.width = "250px";
});


closeNav.addEventListener('click', function () {
    document.getElementById('mySidenav').style.width = "0px";
});

$(document).ready(function () {
    $('.slick-carousel').slick({
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }]
    });

    function createHomePageProductCard(obj) {
        var mainDiv = document.createElement('div');
        mainDiv.classList.add('product-card');

        var productLink = document.createElement('a');
        productLink.href = '/product/details.html?p=' + obj.id;

        var productImage = document.createElement('img');
        productImage.classList.add('product-image');
        productImage.src = obj.preview;
        productImage.alt = obj.name + ' Pic';

        productLink.appendChild(productImage);

        var innerDiv = document.createElement('div');
        innerDiv.classList.add('product-meta');

        var productName = document.createElement('h4');
        var productNameText = document.createTextNode(obj.name);
        productName.appendChild(productNameText);

        var productBrand = document.createElement('h5');
        var productBrandText = document.createTextNode(obj.brand);
        productBrand.appendChild(productBrandText);

        var productPrice = document.createElement('p');
        var productPriceText = document.createTextNode('Rs ' + obj.price);
        productPrice.appendChild(productPriceText);

        innerDiv.appendChild(productName);
        innerDiv.appendChild(productBrand);
        innerDiv.appendChild(productPrice);

        mainDiv.appendChild(productLink);
        mainDiv.appendChild(innerDiv);

        return mainDiv;
    }


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://5ef6537f2c0f2c00169499fb.mockapi.io/HomePage", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4) {
            var responseArr = JSON.parse(xhttp.responseText);
            for (var i = 0; i < responseArr.length; i++) {
                if (responseArr[i].isAccessory) {
                    accessoryGrid.appendChild(createHomePageProductCard(responseArr[i]));
                }
                else {
                    clothingGrid.appendChild(createHomePageProductCard(responseArr[i]));

                }
            }
        }
    }

});
