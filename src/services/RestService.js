import axios from "axios";

export const ROOT_URL = 'http://localhost:8080';
export const URLS = {
    testproducts: `${ROOT_URL}/test/products`
};

class RestService {
    static async ajax(url, method, data, headers) {
        const config = {
            url,
            method,
            data,
            headers: {...headers},
        };

        return await axios.request(config).then((response) => {
            return response.data;
        });
    }
}

export default RestService;
