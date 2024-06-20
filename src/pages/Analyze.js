import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { historyStore } from '../stores/HistoryStore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { toJS } from 'mobx';

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
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
        };
        fetchData();
    }, []);

    const calculateStatistics = () => {
        const totalSpent = historyStore.history.reduce((total, purchase) => total + purchase.quantity, 0);
        const mostFrequentProduct = historyStore.history
            .reduce((acc, purchase) => {
                const name = purchase.product.name;
                acc[name] = acc[name] ? acc[name] + purchase.quantity : purchase.quantity;
                return acc;
            }, {});
        const productNames = Object.keys(mostFrequentProduct);
        const mostFrequentProductName = productNames.reduce((a, b) => mostFrequentProduct[a] > mostFrequentProduct[b] ? a : b, productNames[0]);
        const mostFrequentBrand = historyStore.history
            .reduce((acc, purchase) => {
                const brand = purchase.product.brand;
                acc[brand] = acc[brand] ? acc[brand] + purchase.quantity : purchase.quantity;
                return acc;
            }, {});
        const brandNames = Object.keys(mostFrequentBrand);
        const mostFrequentBrandName = brandNames.reduce((a, b) => mostFrequentBrand[a] > mostFrequentBrand[b] ? a : b, brandNames[0]);

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

        const scoreCount = historyStore.history.reduce((acc, purchase) => {
            const score = purchase.product.score;
            acc[score] = acc[score] ? acc[score] + 1 : 1;
            return acc;
        }, {});

        const sortedProducts = productNames
            .map(name => ({ name, quantity: mostFrequentProduct[name] }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);

        return { totalSpent, mostFrequentProduct, mostFrequentProductName, mostFrequentBrandName, averageScore, scoreCount, sortedProducts };
    };

    const calculateTagStatistics = () => {
        const tagCategories = {
            'Organic': 0,
            'Vegan': 0,
            'Gluten-Free': 0,
            'Non-GMO': 0,
            'Low Sugar': 0
        };

        historyStore.history.forEach(purchase => {
            const productTags = toJS(purchase.product.tags);
            productTags.forEach(tag => {
                if (tagCategories[tag.name] !== undefined) {
                    tagCategories[tag.name]++;
                }
            });
        });

        const totalPurchases = historyStore.history.length;
        const tagPercentages = {};
        Object.keys(tagCategories).forEach(tag => {
            tagPercentages[tag] = (tagCategories[tag] / totalPurchases) * 100;
        });

        return tagPercentages;
    };

    const stats = calculateStatistics();
    const tagStats = calculateTagStatistics();

    const scoreChartData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                label: 'Score Frequency',
                data: ['A', 'B', 'C', 'D'].map(score => stats.scoreCount[score] || 0),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
            },
        ],
    };

    const tagChartData = {
        labels: Object.keys(tagStats),
        datasets: [
            {
                label: 'Tag Categories (%)',
                data: Object.values(tagStats),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
            },
        ],
    };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-5">Purchase Analysis</h1>
            <Row className="gx-10">
                <Col md={6}>
                    <h3 className="text-center">Most frequently bought</h3>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stats.sortedProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-around">
                    <div className="mb-4">
                        <h3 className="text-center">Score Frequency</h3>
                        <Doughnut data={scoreChartData} />
                    </div>
                    <div>
                        <h3 className="text-center mt-5">Tag Categories (%)</h3>
                        <Bar data={tagChartData} className="mt-3" />
                    </div>
                </Col>
            </Row>
        </Container>
    );
});

export default Analyze;
