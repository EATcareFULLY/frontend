import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react";
import { historyStore } from "../stores/HistoryStore";
import { scanStore } from "../stores/ScanStore";
import { FaChartBar } from "react-icons/fa";
import { FaSnowflake, FaSun, FaLeaf, FaCloudRain, FaUmbrella, FaTree } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import Loading from "../components/layout/Loading"
import MonthlyGroup from "../components/history/MonthlyGroup";
import nutri_a from '../assets/nutri-score/nutri-score-a.svg';
import nutri_b from '../assets/nutri-score/nutri-score-b.svg';
import nutri_c from '../assets/nutri-score/nutri-score-c.svg';
import nutri_d from '../assets/nutri-score/nutri-score-d.svg';
import nutri_e from '../assets/nutri-score/nutri-score-e.svg';
import nutri_unknown from '../assets/nutri-score/nutri-score-unknown.svg';
import './History.css';
import RecommendationModal from '../components/recommendations/RecommendationModal';

const monthIcons = {
    "01": <FaSnowflake className="text-white" />,
    "02": <FaSnowflake className="text-white" />,
    "03": <FaLeaf className="text-white" />,
    "04": <FaUmbrella className="text-white" />,
    "05": <FaSun className="text-white" />,
    "06": <FaSun className="text-white" />,
    "07": <FaSun className="text-white" />,
    "08": <FaSun className="text-white" />,
    "09": <FaLeaf className="text-white" />,
    "10": <FaTree className="text-white" />,
    "11": <FaCloudRain className="text-white" />,
    "12": <FaSnowflake className="text-white" />
};

const History = observer(() => {

    const [showRecommendationModal, setShowRecommendationModal] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
            console.log("history", historyStore.history);
        };

        fetchData();
    }, []);

    const showDetails = (barcode) => {
        scanStore.setProductCode(barcode);
        navigate('/Details')
    }
    const showAnalyze = () => {
        navigate('/Analyze')
    }
    const showModal = () => {
        setShowRecommendationModal(true)
        console.log("modal", showRecommendationModal)
    }
    const closeModal = () => {
        setShowRecommendationModal(false)
    }

    const scoreImages = {
        'a': nutri_a,
        'b': nutri_b,
        'c': nutri_c,
        'd': nutri_d,
        'e': nutri_e,
        'unknown': nutri_unknown
    };

    const groupedHistory = historyStore.getProductsGroupedByMonth();

    const formatMonth = (yearMonth) => {
        const [year, month] = yearMonth.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleString('en-US', { year: 'numeric', month: 'long' });
    };

    const getMonthAndYear = (yearMonth) => {
        const [year, month] = yearMonth.split('-');
        return {
            month: month,
            year: year
        }
    }

    return (
        <div className="w-full text-left">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="mb-8">
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800">Purchase List</h2>
                        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                            <button
                                onClick={showModal}
                                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
                            >
                                <span className="text-base font-medium whitespace-nowrap">Today's Recommendations</span>
                                <AiTwotoneLike size={20} className="flex-shrink-0"/>
                            </button>
                            <button
                                onClick={showAnalyze}
                                className="w-full sm:w-auto flex justify-center items-center gap-2 bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary/90 transition-colors"
                            >
                                <span className="text-base font-medium whitespace-nowrap">General Analytics</span>
                                <FaChartBar size={20} className="flex-shrink-0"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-0">
                        {Object.keys(groupedHistory).length === 0 ? (
                            <div className="flex justify-center items-center min-h-[200px]">
                                <Loading/>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200 pl-0 ml-0">
                                {Object.keys(groupedHistory).map((yearMonth) => (
                                    <li key={yearMonth} className="pt-6 first:pt-0">
                                        <MonthlyGroup
                                            yearMonthString={yearMonth}
                                            yearMonth={getMonthAndYear(yearMonth)}
                                            purchases={groupedHistory[yearMonth]}
                                            monthIcon={monthIcons[yearMonth.split('-')[1]]}
                                            formatMonth={formatMonth}
                                            scoreImages={scoreImages}
                                            showDetails={showDetails}
                                        />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            {showRecommendationModal && <RecommendationModal closeModal={closeModal}/>}
        </div>
    );
});

export default History;
