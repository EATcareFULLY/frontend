import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { observer } from "mobx-react";
import { historyStore } from "../stores/HistoryStore";
import { recommendationsStore } from "../stores/RecommendationsStore";
import { scanStore } from "../stores/ScanStore";
import { FaChartBar } from "react-icons/fa";
import { FaSnowflake, FaSun, FaLeaf, FaCloudRain, FaUmbrella, FaTree } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import Loading from "../components/Loading"
import MonthlyGroup from "../components/MonthlyGroup";
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
        <div>
            <div className="relative mb-4 ">
                <button
                    className="absolute top-0 right-0 flex items-center gap-2 bg-primary text-white rounded p-2"
                    onClick={showAnalyze}
                >
                    <span className="text-lg font-medium">General Analytics</span>
                    <FaChartBar size={24}/>
                </button>
                <h2 className="mt-2">Purchase List</h2>
                <button
                    className="absolute top-0 left-8 flex items-center gap-2 bg-primary text-white rounded p-2"
                    onClick={showModal}
                >
                    <span className="text-lg font-medium">New recommendations!</span>
                    <AiTwotoneLike size={24}/>
                </button>

            </div>
            <div className="my-10 px-6 py-2 rounded-lg border">

                {Object.keys(groupedHistory).length === 0 ? (
                    <Loading/>
                ) : (
                    <ul className="divide-y space-y-10 divide-gray-300">
                        {Object.keys(groupedHistory).map((yearMonth) => (
                            <MonthlyGroup
                                key={yearMonth}
                                yearMonthString={yearMonth}
                                yearMonth={getMonthAndYear(yearMonth)}
                                purchases={groupedHistory[yearMonth]}
                                monthIcon={monthIcons[yearMonth.split('-')[1]]}
                                formatMonth={formatMonth}
                                scoreImages={scoreImages}
                                showDetails={showDetails}
                            />
                        ))}
                    </ul>
                )}
                {showRecommendationModal && <RecommendationModal closeModal={closeModal}/>}
            </div>
        </div>
    );
});

export default History;
