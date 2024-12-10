import React, {useContext} from "react";
import img_placeholder from '../../assets/placeholders/product-photo-placeholder.png';
import { BsFillPieChartFill } from "react-icons/bs";
import { PulseLoader } from 'react-spinners';
import ApiService from '../../services/ApiService';
import {ConnectionContext} from "../../utils/ConnectionContext"
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {InfoCircleFill} from "react-bootstrap-icons";

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
        <div className="w-full">
            <div className="bg-primary rounded-lg mb-4">
                <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
                    <div
                        className="flex items-center gap-2 text-white w-full sm:w-auto justify-center sm:justify-start">
                        <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            {monthIcon} {formatMonth(yearMonthString)}
                        </span>
                    </div>
                    <div className="flex justify-center w-full sm:w-auto">
                        <button
                            data-testid={"report-button-2024-01"}
                            className={`rounded h-10 w-10 md:h-12 md:w-12 flex items-center justify-center 
                                ${connected
                                ? 'bg-[#5e4e2b] text-[#648c4c] hover:text-white'
                                : 'bg-gray-400 text-black cursor-not-allowed'
                            }`}
                            disabled={!connected}
                            onClick={() => handleGeneratePdf(yearMonth.month, yearMonth.year)}
                        >
                            {loading
                                ? <PulseLoader loading={true} size={5} color={"white"}/>
                                : <BsFillPieChartFill size={20}/>
                            }
                        </button>
                        <OverlayTrigger
                            placement="bottom"
                            target="click"
                            overlay={
                                <Tooltip id="info-tooltip">
                                    Download monthly dietary report.
                                </Tooltip>
                            }
                        >
                            <InfoCircleFill data-testid="info-tooltip-icon" className="ml-2" style={{cursor: "pointer", fontSize: "1.25rem"}}/>
                        </OverlayTrigger>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                {purchases.map((purchase, index) => (
                    <div
                        key={`${yearMonthString}-${index}`}
                        data-testid={"purchase"}
                        className={`rounded-lg p-4 cursor-pointer transition-all
                            ${index % 2 === 0 ? 'bg-primary-subtle' : 'bg-[#F2F2F2]'}
                            hover:brightness-95 border`}
                        onClick={() => showDetails(purchase.product.id)}
                    >
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <img
                                    src={purchase.product.imageURL || img_placeholder}
                                    alt={purchase.product.name}
                                    className="w-full h-full rounded-full object-cover border-2"
                                />
                            </div>

                            <div className="flex-1 space-y-2 text-center md:text-left">
                                <h3 className="text-lg md:text-xl font-semibold text-black line-clamp-2">
                                    {purchase.product.name}
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm md:text-base">
                                    <p className="text-gray-700">
                                        Brand: {purchase.product.brand}
                                    </p>
                                    <p className="text-gray-700">
                                        Quantity: {purchase.quantity}
                                    </p>
                                    <p className="text-gray-700">
                                        {new Date(purchase.purchaseDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                                <img
                                    src={scoreImages[purchase.product.score || 'unknown']}
                                    alt="Nutri-Score"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyGroup;
