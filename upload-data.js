import axios from "axios";
import fs from "fs";


(async () => {
    let file = fs.readFileSync('./data/gucci.json', 'utf8');

    let temp = JSON.parse(file);
    let url = `http://localhost:5000/api/v1/products`;


    // const { name, description, brand, category, sizes, colors, price, totalQty } = req.body;
    for (let i = 0; i < temp.length; i++) {
        let { name, description, brand, category, sizes, colors, images, price, totalQty, } = temp[i];

        let obj = {
            name,
            description,
            brand,
            category,
            sizes,
            colors,
            images,
            price,
            totalQty,
        };
        let res = await axios.post(url, {
            ...obj,
        }, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzMzMzNkMDRhMTRiM2ZjMTdlNGQ0OSIsImlhdCI6MTY5MDUxNTU0MywiZXhwIjoxNjkwNzc0NzQzfQ.0fKqsJ5QasXGUc55RrT43_FB5U_6XBEEATUOsl2ONE0'
            },
        });
        console.log(res.data);

    }
})();