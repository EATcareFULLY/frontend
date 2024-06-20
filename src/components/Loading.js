import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loading = ({ loading = true, size = 20, color = "#011818" }) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <PulseLoader loading={loading} size={size} color={color} />
        </div>
    );
};

export default Loading;
