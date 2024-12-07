import React from 'react';

const NotAvailableInOfflineMode = () => {
    return (
        <div className="container mt-5">
            <div className="text-center">
                <h2>Not Available</h2>
                <p>To use this feature, please connect the application to the internet.</p>
                <p>Reconnect and try again.</p>
            </div>
        </div>
    );
};

export default NotAvailableInOfflineMode;
