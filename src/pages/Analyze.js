import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { historyStore } from '../stores/HistoryStore';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

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

    const totalSpent = historyStore.getTotalSpent();
    const { mostFrequentProductName } = historyStore.getMostFrequentProduct();
    const mostFrequentBrandName = historyStore.getMostFrequentBrand();
    const averageScore = historyStore.getAverageScore();
    const scoreCount = historyStore.getScoreCount();
    const sortedProducts = historyStore.getSortedProducts();
    const tagStats = historyStore.getTagStatistics();

    const scoreChartData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [
            {
                label: 'Score Frequency',
                data: ['A', 'B', 'C', 'D'].map(score => scoreCount[score] || 0),
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
            <h2 className="text-center mb-5">Your healthy score: {averageScore}</h2>
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
                        {sortedProducts.map((product, index) => (
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
