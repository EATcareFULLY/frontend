import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: `${window.location.origin}/auth`,
    realm: "eat-carefully",
    clientId: "frontend_client_docker"
});

export default keycloak;