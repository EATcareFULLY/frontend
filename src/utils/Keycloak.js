import Keycloak from "keycloak-js";
import {KEYCLOAK_ROOT_URL} from "./URLS";

const keycloak = new Keycloak({
    url: `${KEYCLOAK_ROOT_URL}`,
    realm: "eat-carefully",
    clientId: "frontend_client",
});

export default keycloak;
