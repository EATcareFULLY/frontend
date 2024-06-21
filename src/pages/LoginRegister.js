import React, { useEffect } from 'react';

const LoginRegister = () => {
    useEffect(() => {
        // Przekierowanie użytkownika na określony adres URL
        window.location.href = 'http://localhost:8081/test/secure';
    }, []);

    return null; // Nie renderuj nic
};

export default LoginRegister;