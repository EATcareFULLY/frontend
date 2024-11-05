import React from 'react';
import {useNavigate} from "react-router-dom";

const ProductNotFound = () => {
    const navigate = useNavigate();

    const handleBackToScan = () => {
        navigate('/Scan');
    };

    return (
        <div className="container mt-5">
            <div className="alert alert-secondary text-center">
                <h2>Product Not Found</h2>
                <p>The product you are looking for does not exist in our database.</p>
                <p>Try again with different product.</p>
                <button className="btn btn-primary text-white mt-2" onClick={handleBackToScan}>
                    Scan again
                </button>
            </div>
        </div>
    );
};

export default ProductNotFound;