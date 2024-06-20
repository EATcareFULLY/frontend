import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'; // Importowanie pliku CSS dla dodatkowego stylowania

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4">
            <Container>
                <Row>
                    <Col md={4} className="text-center text-md-left">
                        <h5>About Us</h5>
                        <p>
                            Application is in early-development stage. <br/> Be aware of potential bugs.
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Contact</h5>
                        <p>Email: EatBusiness@gmail.com</p>
                        <p>Phone: (123) 000-200-100</p>
                    </Col>
                    <Col md={4} className="text-center text-md-right">
                        <h5>Follow Us</h5>
                        <div><a href="https://www.facebook.com/slawomirmentzen/" className="text-white mr-2">Facebook<i className="fab fa-facebook-f"></i></a></div>
                        <div> <a href="https://x.com/SlawomirMentzen" className="text-white mr-2">Twitter<i className="fab fa-twitter"></i></a></div>
                    <div><a href="https://www.instagram.com/slawomirmentzen/" className="text-white">Instagram<i className="fab fa-instagram"></i></a></div>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col className="text-center">
                        <p className="mb-0">&copy; 2024 Your Company. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
