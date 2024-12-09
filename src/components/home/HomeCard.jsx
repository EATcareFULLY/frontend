import React from "react";

const HomeCard = ({ title, body }) => {
    return (
        <div className="p-4">
            <h1 className="mb-4">{title}</h1>
            <p className="mb-4">{body}</p>
        </div>
    );
};

export default HomeCard;
