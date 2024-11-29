import React from "react";

const LabelAnalysisTextField = ({ title, value }) => {
    return (
        <div className="mb-3">
            <h5>{title}</h5>
            <p>{value}</p>
        </div>
    );
};

export default LabelAnalysisTextField;