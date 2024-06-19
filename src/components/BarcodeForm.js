import React, {useState} from "react";

const BarcodeForm = ({barcodeSubmition }) => {

    const [inputBarcode, setInputBarcode] = useState("");

    const handleInputChange = (e) => {
        setInputBarcode(e.target.value);
    };

    const handleInputSubmit = () => {
        barcodeSubmition(inputBarcode);
    };

    return (
        <div className="text-center">
            <h2>Or Enter the Product Code Manually</h2>
            <div className="input-group mt-3">
                <input
                    type="text"
                    className="form-control"
                    value={inputBarcode}
                    onChange={handleInputChange}
                    placeholder="Enter barcode"
                />
                <button
                    className="btn btn-secondary"
                    onClick={handleInputSubmit}
                    type="button"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default BarcodeForm;
