import {Card} from "react-bootstrap";
import React from "react";

const HomeCard = ({title, body}) => {
    return (
        <Card className="bg-dark bg-opacity-75 animate__animated animate__fadeIn">
            <Card.Body>
                <Card.Title as="h1" className="mb-4 text-white animated-text">
                    {title}
                </Card.Title>
                <Card.Text className="mb-4 text-white animated-text">
                    {body}
                </Card.Text>
            </Card.Body>
        </Card>
    )

}

export default HomeCard;