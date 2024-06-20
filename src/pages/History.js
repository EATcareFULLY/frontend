import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { historyStore } from "../stores/HistoryStore";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './History.css'; // Importowanie pliku CSS

const History = observer(() => {
    useEffect(() => {
        const fetchData = async () => {
            await historyStore.fetchAllPurchases();
            console.log("history", historyStore.history);
        };

        fetchData();
    }, []);

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4">Purchase List</h1>
            {historyStore.history.length === 0 ? (
                <p>Loading...</p>
            ) : (
                <Row xs={1} md={2} className="g-4">
                    {historyStore.history.map((purchase, index) => (
                        <Col key={index}>
                            <Card>
                                <div className="custom-card-header">{purchase.product.name}</div>
                                <Card.Body>
                                    <Card.Subtitle className="mb-2 text-muted">{purchase.product.brand}</Card.Subtitle>
                                    <Card.Text>
                                        <p>Purchase Date: {new Date(purchase.purchaseDate).toLocaleString()}</p>
                                        <p>Quantity: {purchase.quantity}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
});

export default History;
