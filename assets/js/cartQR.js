const Bidv_Acc = "8801095334"
const Mb_Acc = "0939505922"
const BIDV_ID = 970418
const MB_ID = 970422;
const template = "qDNYS5j";
let PaidSuccess = false;
let PaidSuccessTotal = false;
let myBankAccount = {
    bank: "bidv",
    accountNumber: Bidv_Acc,
}

const idClientCheck = GenerateIdCharacterUserPay();

const clientID = '40e24705-c516-4263-a617-d3668b350bb8';
const apiKey = '69f52f31-1a3a-4537-a781-860b8b016871';

const url_qrcode = 'https://api.vietqr.io/v2/generate';
const url_bank = 'https://api.vietqr.io/v2/banks';

localStorage.removeItem("newAdd")
localStorage.removeItem("timer");

// fetch(url_bank)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => console.error('Lỗi r ae =_))', error));

const ProductsJSON = localStorage.getItem('products');
const Products = JSON.parse(ProductsJSON);

var totalPrice = 0;
var slider = document.querySelector('.slider');

function GenerateIdCharacterUserPay() {
    let id = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const possibleNum = "0123456789";
    for (let i = 0; i < 8; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));
    for (let i = 0; i < 6; i++)
        id += possibleNum.charAt(Math.floor(Math.random() * possibleNum.length));
    return id;
}
if (localStorage.getItem('products')) {
    document.querySelector('.modal-background').style.display = 'none';
    Products.forEach((product) => {
        const PriceComma = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        var eachProduct = `<div class="product-shoes" value="${product.id}" style="
        position:relative;
    ">`
        eachProduct += `
    <img src="${product.src}" width="100px" height="100px" style="display:inline-block;">
    <div style="display:inline-block; vertical-align:top">
    <h2 style="" class="product-name" id="${product.id}">${product.name}</h2>
    <div style="display:inline-block;">
                <p style="" class="inital-money" price="${product.price}">Price: ${PriceComma}₫</p>
                <p style="font-size:18px;display:inline-block;margin-right:3px">Quantity: </p><input type="number" min="1" max="1000" step="1" class="product-quantity" id="${product.id}" value="${product.quantity}">
            </div>
        </div>
        <i id="${product.id}" class="fa-solid fa-square-xmark deleteProduct" onclick="RemoveFromCart(this.id)"></i>
        <p class="select">Chọn:</p>
        <input class="checkedBuy" id="${product.id}" price="${product.price * product.quantity}" type="checkbox" style="
        height: 25px;
        width: 25px;
        background-color: #eee;
        ">`
        eachProduct += `</div>`;
        slider.innerHTML += eachProduct;
        // totalPrice += product.price * product.quantity;
    });
    var totalPriceComma = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // if(totalPrice === 0 && Products.length === 0) totalPriceComma = '0'
    // slider.innerHTML += `<p id="checkGio" style="
    // margin-top:20px;
    // font-size:22px;
    // font-weight: bold;
    // ">Tổng tiền: <span style="color:green" id="totalMoney">${totalPriceComma}₫</span></p>`
    // slider.innerHTML += `<img id="qrPay">`
    slider.innerHTML += `
    <div class="button ClickedBuy">
        Mua sản phẩm đã chọn
    </div>`
}

var request = {
    "accountNo": Mb_Acc,
    "accountName": "NGUYEN THANH KHANG",
    "acqId": MB_ID,
    "amount": totalPrice,
    "addInfo": `Thanh toan don hang ${idClientCheck} ${totalPrice}VND`,
    "format": "text",
    "template": template,
}

const options = {
    method: 'POST',
    headers: {
        'x-client-id': clientID,
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(request) // Add your request body here
};

function RemoveModal() {
    document.querySelector(".modal-background").style.display = 'none';
}

function Copy(id) {
    setTimeout(() => {
        document.querySelector("." + id).classList.remove('fa-copy');
        document.querySelector("." + id).classList.add('fa-check');
        setTimeout(() => {
            document.querySelector("." + id).classList.remove('fa-check');
            document.querySelector("." + id).classList.add('fa-copy');
        }, 1000);
    }, 1000);

    if (id.includes("1")) {
        navigator.clipboard.writeText(document.querySelector('.id-transfer').innerHTML);
    }
    else if (id.includes("2")) {
        navigator.clipboard.writeText(document.querySelector('#account-number').innerHTML);
    }
}

// fetch(url_qrcode, options)
// .then(response => response.json())
// .then(data => {
//     document.getElementById("qrPay").src = `${data.data.qrDataURL}`;
// })
// .catch(error => console.error('Error:', error));
function RemoveFromCart(btnId) {
    //>>OBJ<< >>ARR ID IN LCS<<
    Products.forEach((product, index) => {
        if (btnId == product.id) {
            console.log("Product deleted");
            Products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(Products));
            document.querySelector(`.product-shoes[value="${product.id}"]`).remove();
        }
        if (Products.length == 0) {
            localStorage.removeItem('products')
        }
    })
    ifCartNothing();
}
let idTransfer = idClientCheck.trim().toUpperCase() + totalPrice + "VND";
function RenderQR() {
    if (localStorage.getItem("products")) {
        totalPrice = parseFloat(totalPrice);
        totalPriceComma = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // document.querySelector("#totalMoney").innerHTML = `${totalPriceComma}₫`;
        console.log(totalPrice)
        request.amount = totalPrice;
        request.addInfo = `Thanh toan don hang ${idTransfer}VNĐ`;
        options.body = JSON.stringify(request);
        fetch(url_qrcode, options)
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                document.getElementById("qrPay").src = `${data.data.qrDataURL}`;
            })
            .catch(error => console.error('Error:', error));
    }
}

const calculate = () => {
    totalPrice = 0;
    // let IdEachProduct = "";
    document.querySelectorAll('.checkedBuy').forEach((checkbox) => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('price'));
            const quantityInput = document.querySelector(`.product-quantity[id="${checkbox.id}"]`);
            const quantity = parseInt(quantityInput.value);
            // IdEachProduct += checkbox.id + "_";
            totalPrice += price * quantity;
            totalPrice = parseFloat(totalPrice);
        }
    })
    // IdEachProduct = IdEachProduct.slice(0, -1);
    // console.log(IdEachProduct);
    idTransfer = idClientCheck.trim().toUpperCase() + totalPrice + "VND";
    RenderQR();
}

document.querySelectorAll('.checkedBuy').forEach((checkboxs) => {
    checkboxs.addEventListener('change', calculate);
})

document.querySelectorAll('.product-quantity').forEach((quantityInputs) => {
    quantityInputs.addEventListener('input', calculate);
})

calculate();

// Example list of products
// const products = [
//     { id: 1, src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a9f766ef-12bf-40d4-a8ea-8c38fc7e25d8/ja-1-ep-basketball-shoes-83QqdQ.png", name: 'JA 1 EP', price: 500, quantity: 1},
//     { id: 2, src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/24677ace-081d-4ae4-9ec7-6887c682a40e/p-6000-shoes-QcQbpx.png", name: 'Nike P-6000', price: 1000, quantity: 1},
//     { id: 3, src: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e9c21b76-ad34-40c6-9338-8d910c8cc30d/court-royale-2-low-shoe-fjdwrF.png", name: 'Nike Court Royale 2 Low', price: 500, quantity: 1}
//   ];

//   // Convert the list to a JSON string
// const productsJSON = JSON.stringify(products);

//   // Store the JSON string in localStorage
// localStorage.setItem('products', productsJSON);

// Retrieve the JSON string from localStorage
function ifCartNothing() {
    if (!localStorage.getItem("products")) {
        PaidSuccessTotal = true;
        document.getElementById('modal').style.display = 'none';
        document.querySelector(".slider").innerHTML += `<p id="checkGio" style="
        margin-top:20px;
        font-size:22px;
        font-weight: bold;
        ">Hãy thêm vào giỏ hàng để lựa chọn thanh toán<span style="color:green" id="totalMoney"></span></p>`;
        if (document.querySelector(".ClickedBuy")) {
            document.querySelector(".ClickedBuy").remove();
        }
    }
}
ifCartNothing();

// CHECK KIỂM TRA THANH TOÁN:
// THANH TOAN DON HANG idTransfer- Ma GD ACSP/ mR124751
if (document.querySelector(".ClickedBuy")) {
    document.querySelector('.ClickedBuy').addEventListener("click", () => {
        if (totalPrice > 0 && totalPrice) {
            document.querySelector('.modal-background').style.display = 'flex';
            StartPay();
        }
    })
}

function PopUpSuccess(time) {
    document.querySelector('.payment-success-box').style.display = 'flex';
    document.querySelector('.payment-success-box').style.animation = "move 2.3s ease-out forwards";
    setTimeout(() => {
        document.querySelector('.payment-success-box').style.display = 'none';
    }, time)
}

function ClearPay(time) {
    setTimeout(() => {
        document.querySelector('.modal-background').style.display = 'none';
        localStorage.removeItem("timer");
        clearInterval(a);
        clearInterval(b);
    }, time)
}

async function checkPaid() {
    if (PaidSuccessTotal) return;
    else {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=IHfKTAyxTC8iCJ9h6-hgXa5EQwg-2aeWlJdhZcTctLuzbxftk98qgXkIKOZpDkffNp00crMvkFxN5WKByn-1se3Gg66p2t4Ym5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDDJKPsIih3RRDyacyIlDAuCPBanFIvAa5lM9k7PhC5aPAk9hO5Xxk29A1fB5VmhVI_Dl7Osk4xltA9Z3DeMLUmTibYuxZaST9z9Jw9Md8uu&lib=MqRp4dR7lDrfzYFouImgZ_AMUpPdY05-S')
        const result = await response.json();
        const lastedPaid = result.data[result.data.length - 1];
        let IdEachProduct = "";
        if (lastedPaid["Giá trị"] == totalPrice && lastedPaid["Mô tả"].includes(idTransfer)) {
            PaidSuccess = true;
            console.log("Đã thanh toán thành công!");
            totalPrice = 0;
            document.querySelectorAll('.checkedBuy').forEach((checkbox) => {
                if (checkbox.checked) {
                    IdEachProduct += checkbox.id + "_";
                    RemoveFromCart(checkbox.id);
                }
            })
            IdEachProduct = IdEachProduct.slice(0, -1);
            console.log(IdEachProduct);
            PopUpSuccess(2500);
            ClearPay(1000);
            document.querySelectorAll('.checkedBuy').forEach((checkboxs) => {
                checkboxs.checked = false;
            })
            document.querySelectorAll('.product-quantity').forEach((quantityInputs) => {
                quantityInputs.value = 0;
            })
        }
        else {
            console.log("Đang kiểm tra chuyển tiền")
        }

    }
}

function StartPay() {
    if (totalPrice > 0 && totalPrice) {
        var showName = document.querySelector('#name-products');
        showName.innerHTML = " ";
        document.querySelectorAll('.checkedBuy').forEach((checkbox) => {
            if (checkbox.checked) {
                const NameProducts = document.querySelector(`.product-name[id="${checkbox.id}"]`);
                showName.innerHTML += NameProducts.innerHTML + ", ";
            }
        });
        document.querySelector('.total-price').innerHTML = totalPriceComma + " VNĐ";

        var minutes = 2;
        var seconds = 30;

        document.querySelectorAll('.id-transfer').forEach((e) => {
            e.innerHTML = idTransfer;
        })

        function setTimerLocalStore(m, s) {
            let arrayTimer = {
                id: idTransfer,
                minutes: m,
                seconds: s
            }
            localStorage.setItem('timer', JSON.stringify(arrayTimer));
        }
        if (!localStorage.getItem('timer')) {
            setTimerLocalStore(minutes, seconds);
        }
        if (localStorage.getItem('timer')) {
            minutes = JSON.parse(localStorage.getItem('timer')).minutes;
            seconds = JSON.parse(localStorage.getItem('timer')).seconds;
            document.querySelector('.timer').innerHTML = `0${minutes}:${seconds}`;

            const a = setInterval(function () {
                timer();
                console.log("timer")
            }, 1000)
            function timer() {
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                var stringseconds = seconds;
                if (seconds < 10) {
                    stringseconds = `0${seconds}`;
                }
                document.querySelector('.timer').innerHTML = `0${minutes}:${stringseconds}`;
                setTimerLocalStore(minutes, seconds);
                if (minutes <= 0 && seconds <= 0) {
                    document.querySelector('.timer').innerHTML = "00:00";
                    clearInterval(a);
                    document.getElementById("qrPay").src = ``;
                    localStorage.removeItem("timer");
                }
            }
        }

        var b = setInterval(function () {
            if (minutes <= 0 && seconds <= 0) {
                clearInterval(b);
            }
            checkPaid();
        }, 2000)

    }
}