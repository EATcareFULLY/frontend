import React from "react";

const LabelAnalysisTextField = ({ title, value }) => {
    const displayValue = value || "Not found.";

    return (
        <div className="mb-3">
            <h5>{title}</h5>
            <p>{displayValue}</p>
        </div>
    );
};

export default LabelAnalysisTextField;