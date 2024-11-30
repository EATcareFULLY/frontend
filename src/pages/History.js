import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react";
import { historyStore } from "../stores/HistoryStore";
import { scanStore } from "../stores/ScanStore";
import { FaChartBar } from "react-icons/fa";
import { FaSnowflake, FaSun, FaLeaf, FaCloudRain, FaUmbrella, FaTree } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";

import MonthlyGroup from "../components/MonthlyGroup";
import nutri_a from '../assets/nutri-score-a.png';
import nutri_b from '../assets/nutri-score-b.png';
import nutri_c from '../assets/nutri-score-c.png';
import nutri_d from '../assets/nutri-score-d.png';
import nutri_e from '../assets/nutri-score-e.png';
import nutri_unknown from '../assets/nutri-score-unknown.png';
import './History.css';
import RecommendationModal from '../components/recommendations/RecommendationModal';

const monthIcons = {
    "01": <FaSnowflake className="text-blue-400" />,
    "02": <FaSnowflake className="text-blue-300" />,
    "03": <FaLeaf className="text-green-400" />,
    "04": <FaUmbrella className="text-blue-600" />,
    "05": <FaSun className="text-yellow-500" />,
    "06": <FaSun className="text-yellow-400" />,
    "07": <FaSun className="text-orange-400" />,
    "08": <FaSun className="text-yellow-600" />,
    "09": <FaLeaf className="text-green-600" />,
    "10": <FaTree className="text-orange-700" />,
    "11": <FaCloudRain className="text-gray-500" />,
    "12": <FaSnowflake className="text-blue-500" />
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
        <div className="my-10 px-6 bg-gradient-to-r from-gray-100 to-gray-200 py-10 rounded-lg shadow-lg">
            <div className="relative mb-16 ">
                <h1 className="text-4xl font-extrabold text-gray-800 text-center">Purchase List</h1>
                <button
                    className="absolute top-0 right-0 flex items-center justify-center gap-2 w-60 h-20 bg-red-500 text-black rounded-lg shadow-lg"
                    onClick={showAnalyze}
                >
                    <span className="text-lg font-medium">General Analytics</span>
                    <FaChartBar size={24}/>
                </button>
                <button
                    className="absolute top-0 left-8 flex items-center justify-center gap-2 w-80 h-20 bg-yellow-500 text-black rounded-lg shadow-lg"
                    onClick={showModal}
                >
                    <span className="text-lg font-medium">New recommendations!</span>
                    <AiTwotoneLike size={24}/>
                </button>
            </div>

            {Object.keys(groupedHistory).length === 0 ? (
                <p className="text-center">Loading...</p>
            ) : (
                <ul className="divide-y divide-gray-300">
                    {Object.keys(groupedHistory).map((yearMonth) => (
                        <MonthlyGroup
                            key={yearMonth}
                            yearMonthString={yearMonth}
                            yearMonth = {getMonthAndYear(yearMonth)}
                            purchases={groupedHistory[yearMonth]}
                            monthIcon={monthIcons[yearMonth.split('-')[1]]}
                            formatMonth={formatMonth}
                            scoreImages={scoreImages}
                            showDetails={showDetails}
                        />
                    ))}
                </ul>
            )}
            {showRecommendationModal && <RecommendationModal closeModal = {closeModal}/>}
        </div>
    );
});

export default History;
