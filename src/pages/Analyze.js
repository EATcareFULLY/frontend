import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { historyStore } from '../stores/HistoryStore';
import { Bar, Doughnut } from 'react-chartjs-2';
import { FaChartBar } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/ApiService';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const Analyze = observer(() => {
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
        };
        fetchData();
    }, []);

    const totalSpent = historyStore.getTotalSpent();
    const { mostFrequentProductName } = historyStore.getMostFrequentProduct();
    const mostFrequentBrandName = historyStore.getMostFrequentBrand();
    const averageScore = historyStore.getAverageScore();
    const scoreCount = historyStore.getScoreCount();
    const sortedProducts = historyStore.getSortedProducts();
    const tagStats = historyStore.getTagStatistics();
    const sortedBrands = historyStore.getSortedBrands();
    const topIngredients = historyStore.getTopIngredients();


    const showHistory = () => {
        navigate('/History');
    }

    const scoreColorClass = (score) => {
        switch (score) {
            case 'A':
                return 'text-green-600';
            case 'B':
                return 'text-green-400';
            case 'C':
                return 'text-yellow-500';
            case 'D':
                return 'text-orange-500';
            case 'E':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    const tagColors = ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#c084fc'];

    const scoreChartData = {
        labels: ['A', 'B', 'C', 'D', '?'],
        datasets: [
            {
                label: 'Score Frequency',
                data: ['a', 'b', 'c', 'd', 'unknown'].map(score => scoreCount[score] || 0),
                backgroundColor: [
                    '#34d399',
                    '#60a5fa',
                    '#fbbf24',
                    '#f87171',
                    '#a3a3a3',
                ],
            },
        ],
    };

    const ingredientChartData = {
        labels: topIngredients.map(ingredient => ingredient.name),
        datasets: [
            {
                label: 'Occurrences',
                data: topIngredients.map(ingredient => ingredient.count),
                backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#c084fc'],
            },
        ],
    };

    const tagChartData = {
        labels: Object.keys(tagStats),
        datasets: [
            {
                label: 'Tag Categories (%)',
                data: Object.values(tagStats),
                backgroundColor: tagColors.slice(0, Object.keys(tagStats).length),
            },
        ],
    };

    return (
        <div className="my-10 px-6 bg-gradient-to-r from-gray-100 to-gray-200 py-10 rounded-lg shadow-lg">
            <button
                className=" absolute right-6 flex items-center justify-center gap-2 w-60 h-20 bg-red-500 text-black rounded-lg shadow-lg"
                onClick={() => {
                    showHistory()
                }}
            >
                <span className="text-lg font-medium mr-1">History List</span>
                <FaHistory size={24}/>
            </button>
            <h1 className="text-center text-4xl font-extrabold mb-8 text-gray-800">Purchase Analysis</h1>
            <h2 className="text-center text-2xl font-semibold mb-8 text-gray-600">
                Your healthy score:{' '}
                <span className={`${scoreColorClass(averageScore)}`}>{averageScore}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Most Frequently Bought</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200 text-left">
                            <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="px-4 py-2 text-gray-600 font-semibold">#</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold">Product Name</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedProducts.map((product, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 ${
                                        index % 2 === 0 ? 'bg-gray-50' : ''
                                    } hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-2 text-gray-700">{product.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{product.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Most Popular Brands</h3>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200 text-left">
                            <thead>
                            <tr className="bg-gray-100 border-b border-gray-300">
                                <th className="px-4 py-2 text-gray-600 font-semibold">#</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold">Brand Name</th>
                                <th className="px-4 py-2 text-gray-600 font-semibold">Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedBrands.map((brand, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 ${
                                        index % 2 === 0 ? 'bg-gray-50' : ''
                                    } hover:bg-gray-100 transition`}
                                >
                                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                                    <td className="px-4 py-2 text-gray-700">{brand.name}</td>
                                    <td className="px-4 py-2 text-gray-700">{brand.quantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Ingredient Occurrences</h3>
                    <Bar data={ingredientChartData}/>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Score Frequency</h3>
                    <Doughnut data={scoreChartData}/>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-center text-2xl font-semibold mb-6 text-gray-700">Most Frequent Tags (%)</h3>
                    <Bar data={tagChartData}/>
                </div>
            </div>

        </div>
    );
});

export default Analyze;


