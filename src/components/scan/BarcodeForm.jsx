import React, { useState } from "react";
import {Button, InputGroup, FormControl} from "react-bootstrap";

const BarcodeForm = ({ barcodeSubmition }) => {
    const [inputBarcode, setInputBarcode] = useState("");

    const handleInputChange = (e) => {
        setInputBarcode(e.target.value);
    };

    const handleInputSubmit = () => {
        barcodeSubmition(inputBarcode);
    };

    return (
        <div className="text-center">
            <h3>No scanner? Type here</h3>
            <InputGroup className="mt-3" style={{ boxShadow: "none" }}>
                <FormControl
                    type="text"
                    className="form-control"
                    value={inputBarcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                />
                <Button
                    className="btn-primary"
                    onClick={handleInputSubmit}
                >
                    Submit
                </Button>
            </InputGroup>

        </div>
    );
};

export default BarcodeForm;
