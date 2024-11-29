import React, { useState } from "react";
import {Button, FormControl} from "react-bootstrap";
import {labelStore} from "../stores/LabelStore";
import {useNavigate} from "react-router-dom";

const LabelForm = () => {
    const [inputLabel, setInputLabel] = useState("");
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        setInputLabel(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight+5}px`;
    };

    const handleInputSubmit = () => {
        labelStore.setLabelText(inputLabel);
        navigate('/LabelAnalysis');
    };

    return (
        <div className="text-center">
            <FormControl
                as="textarea"
                rows={1}
                className="form-control mt-3"
                value={inputLabel}
                onChange={handleInputChange}
                placeholder="Enter label"
            />
            <Button
                className="btn-primary mt-3"
                onClick={handleInputSubmit}
            >
                Submit
            </Button>
        </div>
    );
};

export default LabelForm;
