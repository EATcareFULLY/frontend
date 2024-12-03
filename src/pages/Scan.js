import React, {useContext} from "react";
import { useNavigate } from 'react-router-dom';
import {scanStore} from "../stores/ScanStore";
import BarcodeForm from "../components/BarcodeForm";
import BarcodeScanner from "../components/BarcodeScanner";
import {errorToast} from "../utils/Toasts";
import CameraComponentsWrapper from "../components/CameraComponentsWrapper";
import {ConnectionContext} from "../utils/ConnectionContext"
import NotAvailableInOfflineMode from "../components/NotAvailableInOfflineMode";

const Scan = () => {
    const navigate = useNavigate();
    const {connected} = useContext(ConnectionContext)
    const validateBarcode = (barcode) => {
        const barcodePattern = /^\d+$/;
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

    //consider container as a wrapper

    return (
        connected ? (
            <div>
                <CameraComponentsWrapper>
                    <BarcodeScanner barcodeSubmition={barcodeSubmition} />
                </CameraComponentsWrapper>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-6">
                        <BarcodeForm barcodeSubmition={barcodeSubmition} />
                    </div>
                </div>
            </div>
        ) : (
            <NotAvailableInOfflineMode serviceName = {"Scan"} />
        )
    );
};

export default Scan;