import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { historyStore } from '../stores/HistoryStore';
import { Container, Table } from 'react-bootstrap';
//import './Analyze.css';

const Analyze = observer(() => {
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
        };
        fetchData();
    }, []);

    const calculateStatistics = () => {
        console.log(historyStore.history)
        const totalSpent = historyStore.history.reduce((total, purchase) => total + purchase.quantity, 0);
        const mostFrequentProduct = historyStore.history
            .map(purchase => purchase.product.name)
            .reduce((acc, name) => {
                acc[name] = acc[name] ? acc[name] + 1 : 1;
                return acc;
            }, {});
        const productNames = Object.keys(mostFrequentProduct)
        const mostFrequentProductName = productNames.reduce((a, b) => {
            a = mostFrequentProduct[a] > mostFrequentProduct[b] ? a : b
            return a
        },productNames[0]);
        const mostFrequentBrand = historyStore.history
            .map(purchase => purchase.product.brand)
            .reduce((acc, name) => {
                acc[name] = acc[name] ? acc[name] + 1 : 1;
                return acc;
            }, {});
        const brandNames = Object.keys(mostFrequentBrand)
        const mostFrequentBrandName = brandNames.reduce((a, b) => {
            a = mostFrequentBrand[a] > mostFrequentBrand[b] ? a : b
            return a
        },brandNames[0]);
        console.log(totalSpent);

        const scoreMap = {
            'A': 4,
            'B': 3,
            'C': 2,
            'D': 1
        };

        const totalScore = historyStore.history
            .reduce((total, purchase) => total + (scoreMap[purchase.product.score] || 0), 0);

        const averageScoreNumeric = totalScore / historyStore.history.length;

        const numericToLetterScore = (averageScore) => {
            if (averageScore >= 3.5) {
                return 'A';
            } else if (averageScore >= 2.5) {
                return 'B';
            } else if (averageScore >= 1.5) {
                return 'C';
            } else {
                return 'D';
            }
        };

        const averageScore = numericToLetterScore(averageScoreNumeric);

        return { totalSpent, mostFrequentProductName, mostFrequentBrandName, averageScore };
    };



    const stats = calculateStatistics();

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Purchase Analysis</h1>
            <h3>Product count: {stats.totalSpent}</h3>
            <h3>Most Frequent Product: {stats.mostFrequentProductName}</h3>
            <h3>Most Frequent Brand: {stats.mostFrequentBrandName}</h3>
            <h3>Average score: {stats.averageScore}</h3>
            <Table striped bordered hover className="mt-5">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Score</th>
                    <th>Purchase Date</th>
                </tr>
                </thead>
                <tbody>
                {historyStore.history.map((purchase, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{purchase.product.name}</td>
                        <td>{purchase.product.brand}</td>
                        <td>{purchase.product.score}</td>
                        <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    );
});

export default Analyze;
