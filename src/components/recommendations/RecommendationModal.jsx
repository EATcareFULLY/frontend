import React, { useEffect, useState } from "react";
import { FaSadTear } from "react-icons/fa";
import nutri_a from '../../assets/nutri-score/nutri-score-a.png';
import nutri_b from '../../assets/nutri-score/nutri-score-b.png';
import nutri_c from '../../assets/nutri-score/nutri-score-c.png';
import nutri_d from '../../assets/nutri-score/nutri-score-d.png';
import nutri_e from '../../assets/nutri-score/nutri-score-e.png';
import nutri_unknown from '../../assets/nutri-score/nutri-score-unknown.png';
import ComparisonCard from "./ComparisonCard";
import { historyStore } from "../../stores/HistoryStore";
import { observer } from "mobx-react";
import { get } from "mobx";

const RecommendationModal = ({ closeModal }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [recommendationsReady, setRecommendationsReady] = useState(false);

    const scoreImages = {
        'A': nutri_a,
        'B': nutri_b,
        'C': nutri_c,
        'D': nutri_d,
        'E': nutri_e,
        'unknown': nutri_unknown
    };

    // useEffect(() => {
    //     if (recommendations && recommendations.length > 0) {
    //         setRecommendationsReady(true);
    //     } else {
    //         setRecommendationsReady(false);
    //         setIsVisible(false);
    //     }
    // }, [recommendations]);

    useEffect(() => {
            
                setIsVisible(true);
            }
        ,[]);

    useEffect(() => {
        if (recommendationsReady)
        {
            const timeout = setTimeout(() => setIsVisible(true), 100);
            return () => clearTimeout(timeout);
        }
    }, [recommendationsReady]);

        

    const recommendations = historyStore.history.map((purchase) => ({
        ...purchase.product,
        nutriScoreImage: scoreImages[purchase.product.score || 'unknown']
    }));


    return (
        <div
            className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 md:w-1/2 h-2/3 bg-white shadow-lg rounded-t-lg transition-transform duration-300 ${
                isVisible ? "translate-y-[-40%]" : "translate-y-full"
            }`}
        >
            <div className="p-4 relative h-full flex flex-col">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                >
                    ✕
                </button>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
                    Recommended Products
                </h2>
                {recommendations && recommendations.length > 0 ? (
                    <ul className="flex flex-col gap-4 overflow-y-auto py-4 px-3 flex-1 bg-white border border-yellow-500">
                        {recommendations.map((product, index) => (
                            <li key={index}>
                                <ComparisonCard
                                    productA={product}
                                    productB={product}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="flex justify-center items-center flex-1">
                        <p className="text-gray-500 flex items-center gap-2">
                            <span>No new recommendations.</span>
                            <FaSadTear size={24} />
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(RecommendationModal);
