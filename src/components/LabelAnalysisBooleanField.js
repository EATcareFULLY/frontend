import React from "react";
import { FaCheck, FaTimes, FaQuestion } from "react-icons/fa";

const LabelAnalysisBooleanField = ({ title, value }) => {
    let icon, color, tooltip;

    if (value === "True") {
        icon = <FaCheck />;
        color = "text-success";
        tooltip = "True";
    } else if (value === "False") {
        icon = <FaTimes />;
        color = "text-danger";
        tooltip = "False";
    } else {
        icon = <FaQuestion />;
        color = "text-warning";
        tooltip = "Unknown or ambiguous value";
    }

    return (
        <div className="d-flex align-items-center mb-3">
            <h5 className="me-2">{title}</h5>
            <div className={color} title={tooltip}>
                {icon}
            </div>
        </div>
    );
};

export default LabelAnalysisBooleanField;
