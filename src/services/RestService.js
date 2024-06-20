import axios from "axios";

export const ROOT_URL = 'http://localhost:8081';
export const URLS = {
    products: `${ROOT_URL}/products`,
    testproducts: `${ROOT_URL}/test/products`,
    testproduct: `${ROOT_URL}/test/product`,
    testpurchases: `${ROOT_URL}/test/purchases`
};

class RestService {
    static async ajax(url, method, data, headers) {
        const config = {
            url,
            method,
            data,
            headers: {...headers},
            withCredentials: true
        };

        return await axios.request(config).then((response) => {
            return response.data;
        });
    }
}

export default RestService;
