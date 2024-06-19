import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import './BarcodeScanner.css';

const BarcodeScanner = ({ barcodeSubmition }) => {

    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
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
        };
    }, [barcodeSubmition]);

    return (
        <div>
            <h2>Scan the Product Barcode</h2>
            <div id="reader" className="mt-3"></div>
        </div>
    );
};

export default BarcodeScanner;
