import axios from "axios";

(async () => {
    let url = `http://localhost:5000/api/v1/products`;

    let res = await axios.post(url, {});

})();