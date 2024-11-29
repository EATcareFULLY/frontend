import React, { useState } from "react";
import {Button, FormControl} from "react-bootstrap";
import {labelStore} from "../stores/LabelStore";
import {errorToast} from "../utils/Toasts";

const LabelForm = ({labelSubmition}) => {
    const [inputLabel, setInputLabel] = useState("");

    const handleInputChange = (e) => {
        setInputLabel(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight+5}px`;
    };

    const handleInputSubmit = () => {
        if (validateLabel(inputLabel)) {
            labelStore.setLabelText(inputLabel);
            labelSubmition();
        } else {
            errorToast("Invalid label format.")
        }
    };

    const validateLabel = (label) => {

        const forbiddenPattern = /[`<>$]/;
        if (forbiddenPattern.test(label)) {
            return false;
        }

        if (!label.trim()) {
            return false;
        }

        return true;
    }

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
