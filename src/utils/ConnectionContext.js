import React, { createContext, useState, useEffect } from 'react';
import ApiService from '../services/ApiService';
export const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
    const [connected, setConnected] = useState(false);

    const checkConnectionStatus = async () => {
        try {
            const status = await ApiService.checkConnection();
            setConnected(status);
            console.log(status);
        } catch (error) {
            console.error('Error checking connection:', error);
            setConnected(false);
        }
    };

    useEffect(() => {
        checkConnectionStatus();
        const intervalId = setInterval(checkConnectionStatus, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ConnectionContext.Provider value={{ connected, setConnected }}>
            {children}
        </ConnectionContext.Provider>
    );
};