import React from 'react';

const CameraComponentsWrapper = ({ children }) => {
    return (
        <div className="row justify-content-center mt-2">
            <div className="col-md-8 text-center">
                {children}
            </div>
        </div>
    );
};

export default CameraComponentsWrapper;
