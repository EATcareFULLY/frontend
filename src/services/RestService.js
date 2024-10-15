import axios from "axios";
import keycloak from "../utils/Keycloak";

export const ROOT_URL = 'http://localhost:8081/api';
export const URLS = {
    products: `${ROOT_URL}/products`,
    purchases: `${ROOT_URL}/purchases`,
    testproducts: `${ROOT_URL}/test/products`,
    testproduct: `${ROOT_URL}/test/product`,
    testpurchases: `${ROOT_URL}/test/purchases`
};

class RestService {
    static async ajax(url, method, data, headers = {}) {

        if (keycloak.authenticated) {
            await keycloak.updateToken(30).catch(() => {
                keycloak.logout();
            });

            headers['Authorization'] = `Bearer ${keycloak.token}`;
        }

        const config = {
            url,
            method,
            data,
            headers,
            withCredentials: true
        };

        return await axios.request(config).then((response) => {
            return response.data;
        });
    }
}

export default RestService;

