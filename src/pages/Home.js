import React from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './Home.css';

function Home() {
    return (
        <div className="home-bg">
            <video autoPlay muted loop id="bg-video">
                <source src="https://videos.pexels.com/video-files/3209239/3209239-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
            <Container className="text-center text-white content-container">
                <Row className="justify-content-md-center align-items-center min-vh-100">
                    <Col md="8">
                        <Card className="bg-dark bg-opacity-75 animate__animated animate__fadeIn">
                            <Card.Body>
                                <Card.Title as="h1" className="mb-4 text-white animated-text">Welcome to EATcareFULLY!</Card.Title>
                                <Card.Text className="mb-4 text-white animated-text">
                                    Discover a new way to manage your dietary habits and stay healthy. Our application helps you keep track of your meals, provides nutritional insights, and guides you towards a balanced diet.
                                </Card.Text>
                                <Card.Text className="mb-4 text-white animated-text">
                                    Whether you want to lose weight, gain muscle, or simply eat healthier, EATcareFULLY is your perfect companion on the journey to a better you.
                                </Card.Text>
        
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;