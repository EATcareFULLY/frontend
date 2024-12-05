import axios from "axios";
import keycloak from "../utils/Keycloak";
import {errorToast} from "../utils/Toasts";
import {APP_URLS} from "../utils/URLS";

class RestService {
    static async ajax(url, method, data, headers = {}, responseType = null, params = {}) {
        if (keycloak.authenticated) {
            await keycloak.updateToken(30).catch(() => {
                errorToast("Failed to refresh token. You are being logged out.");
                console.log("failed to update token");
                keycloak.logout({ redirectUri: `${APP_URLS.home}` });
            });

            headers['Authorization'] = `Bearer ${keycloak.token}`;
        }

        const config = {
            url,
            method,
            data,
            headers,
            withCredentials: true,
        };

        if (responseType) {
            config.responseType = responseType;
        }
        if (params) {
            config.params = params;
        }

        return await axios.request(config).then((response) => {
            return response.data;
        });
    }
}

export default RestService;
