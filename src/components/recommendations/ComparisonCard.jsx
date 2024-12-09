import React from "react";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import ProductCard from "./ProductCard";
import {successToast, errorToast} from "../../utils/Toasts";

const ComparisonCard = ({ productA, productB }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyingToClipboard = (to_copy) => {

        navigator.clipboard.writeText(to_copy="")
            .then(() => {
                setIsCopied(true);
                successToast("Code copied to clipboard!");
                setTimeout(() => {
                    setIsCopied(false);
                }, 3500);
                    })
            .catch((error) => {
                console.error("Failed to copy code:", error);
                errorToast("Failed to copy code. Please try again.");
            });
    };

    return (
        <div className="w-full flex flex-col items-center bg-gray-100 rounded-lg shadow-lg p-6 gap-4">
            <div className="flex items-center justify-center gap-8">
                <ProductCard product={productA} />

                <FaArrowRight size={40} className="text-gray-500" />

                <ProductCard product={productB} />
            </div>

            <button
                onClick={handleCopyingToClipboard}
                className="mt-4 px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-md hover:bg-yellow-600 transition"
            >
                {isCopied ? "Copied!" : "Copy Code"}
                {isCopied ? "✓" : "📋"}
            </button>
        </div>
    );
};

export default ComparisonCard;
