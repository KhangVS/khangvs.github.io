
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
		

        // Tạo hàng cho từng hàng trong sheet
        var count = 1;
        jsonData.forEach((row, rowIndex) => {
			if(rowIndex > 0){
			let ok = false;
			let newProduct = `<div class="products" id = ${count} onclick="RenderMoreAboutProducts(this.id)">`
			newProduct += `<div class="describe">`
			 //   row.forEach((cell) => {
			// if(cell == 1){
              row.forEach((smallCell,pos)=>{
                if(pos == 1) newProduct += `<div class="image"><img src="${smallCell}" width="300px" class="render-image"></div>`
				if(pos == 2) newProduct += `<div class="name-products"><p>Type: ${smallCell}</p></div>`;
				if(pos == 3) newProduct += `<div class="price-tag">Price: ${smallCell}</div>`;
				else ok = true;
              })
			newProduct += `<button class="detail"><a href="more.html">Show More</a></button>`;
			newProduct += `</div>`;newProduct += `</div>`;
            count++;
			if(ok) document.querySelector('.slider').innerHTML += newProduct;
            // }
        //   });
		}
        });
        // Hiển thị bảng HTML

      })
      .catch(error => console.error('Lỗi r ae =_))', error));

function RenderMoreAboutProducts(value){
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
                    if(rowIndex > 0){
                        if(cell == value){
                            localStorage.setItem("id", value);
                            row.forEach((smallCell,pos) =>{
                                console.log(smallCell + " ");
                            })
                        }
                    }
                });
            });
    
          })
        .catch(error => console.error('Lỗi r ae =_))', error));
}
