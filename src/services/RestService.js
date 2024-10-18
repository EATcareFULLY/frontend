import axios from "axios";
import keycloak from "../utils/Keycloak";

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

