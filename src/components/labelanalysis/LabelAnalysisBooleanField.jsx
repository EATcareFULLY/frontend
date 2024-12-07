import React from "react";
import { FaCheck, FaTimes, FaQuestion } from "react-icons/fa";

const LabelAnalysisBooleanField = ({ title, value }) => {
    let icon;

    if (value === "true") {
        icon = <FaCheck data-testid="fa-check-icon"/>;
    } else if (value === "false") {
        icon = <FaTimes data-testid="fa-times-icon"/>;
    } else {
        icon = <FaQuestion data-testid="fa-question-icon"/>;
    }

    return (
        <div className="d-flex align-items-center mb-3 justify-center">
            <h5 className="me-2">{title}</h5>
            <div>
                {icon}
            </div>
        </div>
    );
};

export default LabelAnalysisBooleanField;
