import React from "react";

import IMAGE_PLACEHOLDER from "../../assets/placeholders/product-photo-placeholder.png";

const ProductCard = ({ product }) => {
    return (
        <div className="w-64 bg-white rounded-lg shadow-lg p-4 flex flex-col items-center gap-4">
            <img
                src={product.imageURL || IMAGE_PLACEHOLDER}
                alt={product.name}
                className="ml-2 w-32 h-32 rounded-full object-cover border-4 border-dashed border-yellow-600"
            />

            <h3 className="text-lg font-semibold text-gray-800 text-center">
                {product.name}
            </h3>

            <img
                src={product.nutriScoreImage}
                alt="Nutri-Score"
                className="w-28 h-14 object-contain"
            />
        </div>
    );
};

export default ProductCard;
