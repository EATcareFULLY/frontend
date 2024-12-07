import React from 'react';

const LabelButtonsWrapper = ({ children }) => {
    return (
        <div>
            <div className="d-flex justify-content-center gap-3 p-3">
                {children}
            </div>
        </div>
    );
};

export default LabelButtonsWrapper;
