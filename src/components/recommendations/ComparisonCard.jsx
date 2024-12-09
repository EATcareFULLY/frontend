import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const ComparisonCard = ({ productA, productB }) => {
    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-lg shadow-lg p-6 gap-4 sm:flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 w-full">
                <ProductCard product={productA}/>
                <FaArrowRight size={40} className="text-gray-500 sm:mx-4 mx-2"/>
                <ProductCard product={productB}/>
            </div>
            <button
                className="mt-4 px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-md hover:bg-yellow-600 transition"
            >
                Show Code
            </button>
        </div>

    );
};

export default ComparisonCard;
