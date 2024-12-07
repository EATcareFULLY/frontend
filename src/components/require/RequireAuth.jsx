import React, { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Loading from "../layout/Loading";
import {useNavigate} from "react-router-dom";

const RequireAuth = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();
    const navigate = useNavigate();

    useEffect(() => {
        if (initialized && !keycloak.authenticated) {
            navigate("/", {replace: true});
        }
    }, [initialized, keycloak, navigate]);

    if (!initialized) {
        return <Loading />;
    }

    return children;
};

export default RequireAuth;