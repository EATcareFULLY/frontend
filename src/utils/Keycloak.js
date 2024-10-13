import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "eat-carefully",
    clientId: "frontend_client",
});

export default keycloak;
