import React, { useContext } from "react";
import { ConnectionContext } from "../utils/ConnectionContext";
import NotAvailableInOfflineMode from "../components/NotAvailableInOfflineMode";

const RequireConnection = ({ children}) => {
    const { connected } = useContext(ConnectionContext);

    if (!connected) {
        return <NotAvailableInOfflineMode/>;
    }

    return children;
};

export default RequireConnection;
