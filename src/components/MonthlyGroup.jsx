import React from "react";
import img_placeholder from '../assets/product-photo-placeholder.png';
import { BsFillPieChartFill } from "react-icons/bs";
import ApiService from '../services/ApiService';


const MonthlyGroup = ({ yearMonthString, yearMonth, purchases, monthIcon, formatMonth, scoreImages, showDetails }) => {


    const handleGeneratePdf = async (month, year) => {
        await ApiService.generatePdfReport(month, year);
    };

    return (
        <>
            <li className="py-4 bg-gray-300 text-2xl font-bold text-center text-black rounded flex items-center justify-center gap-4">
                {monthIcon} {formatMonth(yearMonthString)}
                <button
                    className="bg-[#648c4c] rounded h-12 w-12 flex items-center justify-center hover:bg-[#5e4e2b] text-[#5e4e2b] hover:text-[#648c4c]"
                    onClick={() => {
                        handleGeneratePdf(yearMonth.month, yearMonth.year);
                    }}
                >
                    <BsFillPieChartFill size={25} />
                </button>
            </li>

            {purchases.map((purchase, index) => (
                <li
                    key={`${yearMonthString}-${index}`}
                        className="flex items-center justify-between py-6 gap-4 even:bg-[#5e4e2b] odd:bg-[#648c4c] hover:brightness-90 border border-black rounded my-1"
                    onClick={() => showDetails(purchase.product.id)}
                >
                    <div className="flex-shrink-0">
                        <img
                            src={purchase.product.imageURL || img_placeholder}
                            alt={purchase.product.name}
                            className="ml-2 w-32 h-32 rounded-full object-cover border-4 border-dashed border-yellow-600"
                        />
                    </div>

                    <div className="flex-1 text-2xl font-semibold text-black">
                        {purchase.product.name}
                    </div>

                    <div className="flex-1 text-xl text-black">
                        Brand: {purchase.product.brand}
                    </div>

                    <div className="flex-1 text-xl text-black">
                        Quantity: {purchase.quantity}
                    </div>

                    <div className="flex-1 text-xl text-black font-medium">
                        {new Date(purchase.purchaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        })}
                    </div>

                    <div className="flex-shrink-0">
                        <img
                            src={scoreImages[purchase.product.score || 'unknown']}
                            alt="Nutri-Score"
                            className="w-32 h-32 object-contain mr-20"
                        />
                    </div>
                </li>
            ))}
        </>
    );
};

export default MonthlyGroup;
