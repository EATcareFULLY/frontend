import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080/",   // keycloak:8080 or localhost:8080?
    realm: "eat-carefully",
    clientId: "frontend_client_docker", // check if keycloak redirect urls and other need fixing
});

export default keycloak;
