var count = 1;
fetch("../../testdatabase.xlsx")
    .then(response => response.arrayBuffer())
    .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });

        // Lấy sheet đầu tiên
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Chuyển đổi sheet thành JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Tạo hàng cho từng hàng trong sheet
        jsonData.forEach((row, rowIndex) => {
            if (rowIndex > 0) {
                let ok = false;
                let newProduct = `<div class="products" value = ${count} onclick="RenderMoreAboutProducts(this.attributes.value)">`
                newProduct += `<div class="describe" value = ${count} onclick="RenderMoreAboutProducts(this.attributes.value)">`;
                row.forEach((smallCell, pos) => {
                    if (pos == 1) newProduct += `<div class="image"><img src="${smallCell}" width="300px" class="render-image"></div>`
                    if (pos == 2) newProduct += `<div class="name-products"><p>Type: ${smallCell}</p></div>`;
                    if (pos == 3) {
                        const stringPrice = smallCell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        newProduct += `<div class="price-tag">Price: ${stringPrice}₫</div>`;
                    }
                    else ok = true;
                })
                newProduct += `<button class="detail"><a href="#" value = ${count} onclick="RenderMoreAboutProducts(this.attributes.value)">Show More</a></button>`;
                newProduct += `</div>`; newProduct += `</div>`;
                count++;
                if (ok) document.querySelector('.slider').innerHTML += newProduct;
            }
        });
        // document.querySelector('.slider').innerHTML += `
        // <div class="footer">
        //     <p>&copy; 2024 Khang Shoe Shop</p>
        // </div>`
    })
    .catch(error => console.error('Lỗi r ae =_))', error));

function RenderMoreAboutProducts(value) {
    value = value.value;
    fetch('../../testdatabase.xlsx')
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Lấy sheet đầu tiên
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            // Chuyển đổi sheet thành JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            jsonData.forEach((row, rowIndex) => {
                row.forEach((cell) => {
                    if (rowIndex > 0) {
                        if (cell == value) {
                            localStorage.setItem("id", value);
                            location.href = 'more.html';
                        }
                    }
                });
            });

        })
        .catch(error => console.error('Lỗi r ae =_))', error));
}

function Enter(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    // Nút enter
    if (code == 13) {
        alert("a")
    }
}

function OnCheckSearch(){
    const RawInputVal = document.getElementById("search-input").value;
    const InputValLower = RawInputVal.trim().toLowerCase();

    const AllNameProducts = document.querySelectorAll(".name-products");
    if(RawInputVal == '' || RawInputVal == " "){
        AllNameProducts.forEach((e) =>{
            e.parentElement.parentElement.classList.remove('disable');
        })
    }else{
        AllNameProducts.forEach((e) =>{
            let nameEach = e.firstElementChild.innerHTML;
            nameEach = nameEach.trim().toLowerCase();
            console.log(nameEach.includes(InputValLower))
            if(nameEach.includes(InputValLower)){
                e.parentElement.parentElement.classList.remove('disable')
            }else{
                e.parentElement.parentElement.classList.add('disable')
            }
        })
    }
}