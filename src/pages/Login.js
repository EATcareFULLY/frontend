import React from 'react';

const Login = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8081/test/secure';
    };

    return (
        <div>
            <h1>Login Page</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
