import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import {Html5QrcodeScanner} from "html5-qrcode";
import {scanStore} from "../stores/ScanStore";

const Scan = () => {

    const navigate = useNavigate();
    const [inputBarcode, setInputBarcode] = useState("");

    useEffect(() => {

        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 }},
            false
        );

        function onScanSuccess(decodedText, decodedResult) {
            console.log(`Code matched = ${decodedText}`, decodedResult);
            barcodeSubmition(decodedText);
        }

        function onScanFailure(error) {}

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        return () => {
            html5QrcodeScanner.clear();
        }

    }, []);

    const validateBarcode = (barcode) => {
        const barcodePattern = /^(?=.*\d)[\d\-]+$/;

        if (!barcodePattern.test(barcode)) {
            return false;
        }

        const barcode_lengths = [8, 12, 13, 14];
        return barcode_lengths.includes(barcode.length);
    };

    const handleInputChange = (e) => {
        setInputBarcode(e.target.value);
    };

    const handleInputSubmit = () => {
        barcodeSubmition(inputBarcode);
    };

    const barcodeSubmition = (barcode) => {
        if (validateBarcode(barcode)) {
            scanStore.setProductCode(barcode);
            navigate("/Details");
        } else {
            alert("Invalid barcode");
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "20px"}}>
            <h2>Scan the Product Barcode</h2>
            <div id="reader" style={{ width: "800px"}}></div>
            <h2>Or Enter the Product Code Manually</h2>
            <input
                type="text"
                value={inputBarcode}
                onChange={handleInputChange}
                placeholder="Enter barcode"
            />
            <button onClick={handleInputSubmit}>Submit</button>

        </div>
    )
}
export default Scan;