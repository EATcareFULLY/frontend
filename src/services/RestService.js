import axios from "axios";
import keycloak from "../utils/Keycloak";

export const ROOT_URL = 'http://localhost:8081';
export const URLS = {
    products: `${ROOT_URL}/api/products`,
    purchases: `${ROOT_URL}/api/purchases`,
    testproducts: `${ROOT_URL}/api/test/products`,
    testproduct: `${ROOT_URL}/api/test/product`,
    testpurchases: `${ROOT_URL}/api/test/purchases`
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

