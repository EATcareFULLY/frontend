import React, {useContext} from "react";
import img_placeholder from '../assets/placeholders/product-photo-placeholder.png';
import { BsFillPieChartFill } from "react-icons/bs";
import { PulseLoader } from 'react-spinners';
import ApiService from '../services/ApiService';
import {ConnectionContext} from "../utils/ConnectionContext"


const MonthlyGroup = ({ yearMonthString, yearMonth, purchases, monthIcon, formatMonth, scoreImages, showDetails }) => {

    const [loading, setLoading] = React.useState(false);
    const {connected} = useContext(ConnectionContext)

    const handleGeneratePdf = async (month, year) => {
        await ApiService.generatePdfReport(month, year, startLoading, endLoading);
    };

    const startLoading = () => {
        setLoading(true)
    }
    const endLoading = () => {
        setLoading(false)
    }

    return (
        <div>
            <li className="py-4 text-2xl font-bold text-center text-white rounded flex items-center justify-center gap-4 bg-primary">
                {monthIcon} {formatMonth(yearMonthString)}
                <button
                    className={` rounded h-12 w-12 flex items-center justify-center bg-[#5e4e2b] text-[#648c4c] hover:text-white ${!connected ? 'bg-gray-400 hover:bg-gray-400 text-black hover:text-black': ''}`}
                    disabled={!connected}
                    onClick={() => {
                        handleGeneratePdf(yearMonth.month, yearMonth.year);
                    }}
                >
                    {
                         loading ? <PulseLoader loading={true} size={5} color={"#5e4e2b"} />: <BsFillPieChartFill size={25} />
                    }
                </button>
            </li>

            {purchases.map((purchase, index) => (
                <li
                    key={`${yearMonthString}-${index}`}
                    className={`flex items-center justify-between py-6 gap-4 hover:brightness-90 border rounded my-1 ${
                        index % 2 === 0 ? 'bg-primary-subtle' : 'bg-white'
                    }`}
                    onClick={() => showDetails(purchase.product.id)}
                >
                    <div className="flex-shrink-0">
                        <img
                            src={purchase.product.imageURL || img_placeholder}
                            alt={purchase.product.name}
                            className="ml-2 w-32 h-32 rounded-full object-cover border-2"
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
        </div>
    );
};

export default MonthlyGroup;
