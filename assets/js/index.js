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

function RenderMoreAboutProducts(values) {
    values = values.value;
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
                            location.href = './more.html';
                        }
                    }
                });
            });

        })
        .catch(error => console.error('Lỗi r ae =_))', error));
}

function SearchThroughFile(event) {
    var valueProducts = "";
    fetch('../../testdatabase.xlsx')
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
                    row.forEach((smallCell, pos) => {
                        if (pos == 2) {
                            valueProducts = smallCell;
                            valueProducts = valueProducts.trim().toLowerCase();
                            if (valueProducts.includes(event)) {
                                for (const cell in worksheet) {
                                    if (cell[0] === '!') continue;
                                    const cellRef = XLSX.utils.decode_cell(cell);
                                    const rowIndex = cellRef.r + 1;  // Adding 1 to get 1-based index
                                    const colIndex = cellRef.c + 1;  // Adding 1 to get 1-based index
                                    var temp2 = worksheet[cell].v;
                                    if (typeof temp2 === "string" && colIndex == 3 && rowIndex > 1) {
                                        temp2 = temp2.trim().toLowerCase();
                                        if (temp2.includes(event)) {
                                            var char = String.fromCharCode(65 + (colIndex - 3));// Kiêu Cell đinh dạng như la A1, B2;
                                            var temp = char + (rowIndex).toString();
                                            document.getElementById(worksheet[temp].v).classList.add("disable")
                                        }
                                    }
                                }
                            }
                        }
                    })
                }
            });
            for (var i = 1; i <= count; i++) {
                document.getElementById(i).classList.toggle("disable");
            }
            // return false;
        })
        .catch(error => console.error('Lỗi r ae =_))', error));
}

function Enter(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
        OnChangeSearch();
    }
}

function OnCheckSearch() {
    var valueSearch = document.getElementById("search-input").value
    if (valueSearch == "" || valueSearch == " ") {
        for (var i = 1; i <= count; i++) {
            document.getElementById(i).classList.remove('disable');
        }
    }
}

function OnChangeSearch() {
    var valueSearch = document.getElementById("search-input").value
    if (valueSearch == "" || valueSearch == " ") {
        for (var i = 1; i <= count; i++) {
            document.getElementById(i).classList.remove('disable');
        }
    }
    else {
        valueSearch = valueSearch.trim().toLowerCase();
        SearchThroughFile(valueSearch);
    }
}