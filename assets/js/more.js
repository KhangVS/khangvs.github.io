fetch('../../testdatabase.xlsx')
	.then(response => response.arrayBuffer())
	.then(data => {        
        const workbook = XLSX.read(data, { type: 'array' });

        // Lấy sheet đầu tiên
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Chuyển đổi sheet thành JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Tạo bảng HTML
        var product = `<div class="product-shoes">`;

        // Tạo hàng cho từng hàng trong sheet
        jsonData.forEach((row, rowIndex) => {
			row.forEach((cell) => {
                if(cell == localStorage.getItem("id")){
                    row.forEach((smallCell,pos)=>{
                        if(pos == 1){
                            product += `
                                <div class="subtle-image">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                    <img src="${smallCell}">
                                </div>
                                <div class="main-image"><img src="${smallCell}" class="img" width="550px"></div>`
                        }
                        if(pos == 2){
                            product += `
                            <div class="main-info">
                                <h3 class="name-product" id="${localStorage.getItem("id")}">${smallCell}</h3>`;
                        }
                        if(pos == 3){
                            const stringPrice = smallCell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            product += `
                            <p class="price" price=${smallCell}>${stringPrice}₫</p>
                            <div class="size-options">
                            <p style="
                            font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                            font-weight: bold;
                            font-size: 20px;
                            ">Select Size</p>
                                    <div class="box-size">
                                        <a>Size 41 VN</a>
                                        <a>Size 42 VN</a>
                                        <a>Size 43 VN</a>
                                        <a>Size 44 VN</a>
                                        <a>Size 45 VN</a>
                                        <a>Size 46 VN</a>
                                    </div>
                                </div>
                                <button class="add-to-cart" onclick="ClickAddValue()">Add to Cart <i class="fa fa-shopping-cart"></i></button>
                                <button class="buy-product"><i class="fa-solid fa-dollar-sign"></i> Buy this product <i class="fa-solid fa-coins"></i></button>
                            </div>
                        </div>`;
                        }
                    })
                }
            });
        });
        document.querySelector(".slider").innerHTML += product;
        
      })
    .catch(error => console.error('Lỗi r ae =_))', error));