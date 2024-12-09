import React from "react";

import IMAGE_PLACEHOLDER from "../../assets/placeholders/product-photo-placeholder.png";

const ProductCard = ({ product }) => {
    return (
      <div className="w-full max-w-xs bg-white rounded-lg shadow-lg p-4 flex flex-col items-center gap-4">
        <img
          src={product.imageURL || IMAGE_PLACEHOLDER}
          alt={product.name}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-dashed border-yellow-600"
        />
        <h3 className="text-base md:text-lg font-semibold text-gray-800 text-center line-clamp-2">
          {product.name}
        </h3>
        <img
          src={product.nutriScoreImage}
          alt="Nutri-Score"
          className="w-24 h-12 md:w-28 md:h-14 object-contain"
        />
      </div>
    );
  };

export default ProductCard;
