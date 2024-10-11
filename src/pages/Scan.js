import React from "react";
import { useNavigate } from 'react-router-dom';
import {scanStore} from "../stores/ScanStore";
import BarcodeForm from "../components/BarcodeForm";
import BarcodeScanner from "../components/BarcodeScanner";
import {errorToast} from "../utils/Toasts";

const Scan = () => {
    const navigate = useNavigate();

    const validateBarcode = (barcode) => {
        const barcodePattern = /^(?=.*\d)[\d\-]+$/;
        if (!barcodePattern.test(barcode)) {
            return false;
        }

        const barcode_lengths = [8, 12, 13, 14];
        return barcode_lengths.includes(barcode.length);
    };

    const barcodeSubmition = (barcode) => {
        if (validateBarcode(barcode)) {
            scanStore.setProductCode(barcode);
            navigate("/Details");
        } else {
            errorToast("Invalid barcode format.")
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-2">
                <div className="col-md-8 text-center">
                    <BarcodeScanner barcodeSubmition={barcodeSubmition} />
                </div>
            </div>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <BarcodeForm
                        barcodeSubmition={barcodeSubmition}
                    />
                </div>
            </div>
        </div>
    );
};

export default Scan;