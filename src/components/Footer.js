import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import eatcarefullylogo from '../assets/logo-full.svg';
import githublogo from '../assets/github-logo.svg';
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
    };

    return (
        <footer className="bg-primary text-white mt-5 p-2">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col md="auto" className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                        <img src={eatcarefullylogo} alt="EATcareFULLY" onClick={handleHome} width="50px" height="50px"  />
                    </Col>

                    <Col md="auto" className="d-flex justify-content-center justify-content-md-end">
                        <a href="https://github.com/EATcareFULLY">
                            <img src={githublogo} alt="GitHub" width="50px" height="50px" />
                        </a>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p className="mb-0">&copy; 2024 EATcareFULLY.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
