import React from 'react';
import {Card, Col} from "react-bootstrap";

const AchievementWrapper = ({ children }) => {
    return (
        <Col xs={6} sm={6} md={4} lg={3} className="d-flex justify-content-center my-3">
            <Card>
                <Card.Body>
                    <div className="text-center">
                        {children}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AchievementWrapper;
