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
        jsonData.forEach((row, rowIndex) => {
			row.forEach((cell) => {
                if(cell == localStorage.getItem("id")){
                    row.forEach((smallCell,pos)=>{
                        console.log(smallCell);
                    })
                }
            });
        });

      })
      .catch(error => console.error('Lỗi r ae =_))', error));