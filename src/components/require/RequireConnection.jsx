import React, { useContext } from "react";
import { ConnectionContext } from "../../utils/ConnectionContext";
import NotAvailableInOfflineMode from "../layout/NotAvailableInOfflineMode";

const RequireConnection = ({ children}) => {
    const { connected } = useContext(ConnectionContext);

    if (!connected) {
        return children; //temp change to allow no connected users to access all pages
    }

    return children;
};

export default RequireConnection;
