var newaddCart = 0;
if(localStorage.getItem('newAdd')) {
    newaddCart = localStorage.getItem('newAdd');
    renderNorti();
}
else if(!localStorage.getItem('newAdd')){
    localStorage.setItem('newAdd', 0);
    newaddCart = -1;
}
function renderNorti(){
    const numAdd = document.querySelector(".new-add");
    if(newaddCart == 0) numAdd.classList.add("disable")
    else if(newaddCart <= 5){
        numAdd.classList.remove("disable")
        numAdd.innerHTML = newaddCart;
    }else{
        numAdd.classList.remove("disable")
        numAdd.style.padding = "3px 5px";
        numAdd.style.right = "14px";
        numAdd.innerHTML = "+5";
    }
}
function ClickAddValue(){
    if(document.querySelector(".add-to-cart").innerHTML == `Product has been added`){
        alert("Đã add vào giỏ hàng, xin hãy kiểm tra");
    }
    else{
        const productId = parseInt(document.querySelector(".name-product").id);
        const productName = document.querySelector(".name-product").innerHTML;
        const productPrice = parseFloat(document.querySelector(".price").attributes.price.value);
        const productImg = document.querySelector(".img").src;
        addLocalStorage(productId, productImg, productName, productPrice);
        document.querySelector(".add-to-cart").innerHTML = `Product has been added`;
        alert("Đã add vào giỏ hàng");
        newaddCart++;
        localStorage.setItem('newAdd', newaddCart);
        renderNorti();
    }
}
function addLocalStorage(index,src,nameProduct,price){

    const storedProductsJSON = localStorage.getItem('products');
    
    if (storedProductsJSON) {
        const storedProducts = JSON.parse(storedProductsJSON);
        
        const check = storedProducts.find(product => product.id === index);

        if(check){
            check.quantity++;
            localStorage.setItem('products', JSON.stringify(storedProducts));
        }
        else{
            storedProducts.push({ id: index, src: src, name: nameProduct, price: price, quantity: 1});
            localStorage.setItem('products', JSON.stringify(storedProducts));
        }
    }else {
        const storedProducts = [];
        
        storedProducts.push({ id: index, src: src, name: nameProduct, price: price, quantity: 1});
        console.log(storedProducts)
        localStorage.setItem('products', JSON.stringify(storedProducts));
    }
}