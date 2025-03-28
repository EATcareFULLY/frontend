import React, { useEffect, useState, useRef } from "react";
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
import { recommendationsStore } from "../../stores/RecommendationsStore";
import RecommendedProduct from "../../stores/RecommendationsStore";


    const scoreImages = {
        'A': nutri_a,
        'B': nutri_b,
        'C': nutri_c,
        'D': nutri_d,
        'E': nutri_e,
        'unknown': nutri_unknown
    };


const RecommendationModal = ({ closeModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const isMounted = useRef(true);
    const [contentVisible, setContentVisible] = useState(false);

    const COMPONENT_NAME = 'RecommendationModal';



    // This useEffect handles cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // This useEffect handles the initial loading animation
    useEffect(() => {
        // Add a small delay before showing the modal for a smooth entrance
        const showTimeout = setTimeout(() => {
            if (isMounted.current) {
                setIsVisible(true);
            }
        }, 100);

        return () => clearTimeout(showTimeout);
    }, []); // We only want this to run once when the modal mounts

    // This useEffect handles the recommendations loading
    useEffect(() => {
        async function loadRecommendations() {
            setIsLoading(true);
            try {
                console.log(`[INFO] ${COMPONENT_NAME}: Starting fetch`);
                await recommendationsStore.fetchRecommendations();
                console.log(`[INFO] ${COMPONENT_NAME}: Fetch complete`, recommendationsStore.productRecommendationsData);
                if (isMounted.current) {
                    setIsLoading(false);
                    setTimeout(() => {
                        setContentVisible(true);
                    }, 100);
                }

            } catch (error) {
                console.error(`[ERROR] ${COMPONENT_NAME}: Fetch failed`, error);
                
            } finally {
                if (isMounted.current) {
                    setIsLoading(false);

                    
                }
            }
        }
        loadRecommendations();
    }, []);

    console.log('recommendationsStore', recommendationsStore.recommendations);

    // Handle the close modal action with animation
    const handleClose = () => {
        setContentVisible(false);
        setIsVisible(false);
        // Wait for the animation to complete before actually closing
        setTimeout(closeModal, 500); // Match this with your CSS transition duration
    };

    return (
        <div
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 md:w-3/4 h-2/3 bg-white shadow-lg rounded-t-lg transition-transform duration-300 ${

                isVisible ? "translate-y-[-40%]" : "translate-y-full"
            }`}
        >
            <div className="p-4 relative h-full flex flex-col">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
                >
                    ✕
                </button>
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
                    Recommended Products
                </h2>
                {isLoading ? (
                    <div className="flex justify-center items-center flex-1">
                    <p className="text-gray-500 text-3xl font-semibold"> Loading recommendations...</p>
                    </div>
                ) : Array.isArray(recommendationsStore.recommendations) && recommendationsStore.recommendations.length > 0 ? (
                        <ul className={`flex flex-col gap-4 overflow-y-auto py-4 px-3 flex-1 bg-white border border-yellow-500
                        transition-all duration-500 transform
                        ${contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >                        {recommendationsStore.recommendations.map((product, index) => (
                            <li key={index}>
                                <ComparisonCard
                                    productA={recommendationsStore.getSourceProduct()}
                                    productB={product}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={`flex justify-center items-center flex-1
                        transition-all duration-500 transform
                        ${contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                    <p className="text-gray-500 text-3xl font-semibold flex items-center gap-4">
                        <span>No new recommendations.</span>
                        <FaSadTear size={48} />
                    </p>
                    </div>

                )}
            </div>
        </div>
    );
};

export default observer(RecommendationModal);
// export default observer(RecommendationModal);
