import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "./Loading";

const RequireAuth = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized && !keycloak.authenticated) {
            keycloak.login();
        }
    }, [initialized, keycloak]);

    if (!initialized) {
        return <Loading />;
    }

    if (!keycloak.authenticated) {
        return null;
    }

    return children;
};

export default RequireAuth;
