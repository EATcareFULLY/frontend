import React from "react";
import { useState } from "react";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import ProductCard from "./ProductCard";
import {successToast, errorToast} from "../../utils/Toasts";

const ComparisonCard = ({ productA, productB }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isError, setIsError] = useState(false);
  
    const handleCopyingToClipboard = (code, name) => {
      if (!code) {
        errorToast("No product code available");
        setIsError(true);
        setTimeout(() => setIsError(false), 3500);
        return;
      }
  
      navigator.clipboard.writeText(code)
        .then(() => {
          setIsCopied(true);
          setIsError(false);
          successToast(`Code of product【${name}】copied to clipboard!`);
          setTimeout(() => setIsCopied(false), 3500);
        })
        .catch((error) => {
          console.error("Failed to copy code:", error);
          setIsError(true);
          errorToast("Failed to copy code. Please try again.");
          setTimeout(() => setIsError(false), 3500);
        });
    };
  
    const buttonClass = `mt-4 px-4 md:px-6 py-2 md:py-3 text-white text-base md:text-lg font-semibold rounded-md transition ${
      isError ? 'bg-red-500 hover:bg-red-600' :
      isCopied ? 'bg-green-500 hover:bg-green-600' :
      'bg-yellow-500 hover:bg-yellow-600'
    }`;
  
    return (
      <div className="w-full flex flex-col items-center bg-gray-100 rounded-lg shadow-lg p-4 md:p-6 gap-4">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          <ProductCard product={productA} />
          <div className="transform rotate-90 md:rotate-0 my-2 md:my-0">
            <FaArrowRight size={24} className="text-gray-500 hidden md:block" />
            <FaArrowRight size={24} className="text-gray-500 md:hidden" />
          </div>
          <ProductCard product={productB} />
        </div>
        
        <button
          onClick={() => handleCopyingToClipboard(productB.id, productB.name)}
          className={buttonClass}
        >
          {isError ? "Error! Try Again" :
           isCopied ? "Copied! ✓" :
           "Copy Code 📋"}
        </button>
      </div>
    );
  };
  
  export default ComparisonCard;
  
