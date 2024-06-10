import React, {useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {Html5QrcodeScanner} from "html5-qrcode";
import {scanStore} from "../stores/ScanStore";

const Scan = () => {

    const navigate = useNavigate();


    useEffect(() => {

        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 }},
            false
        );

        function onScanSuccess(decodedText, decodedResult) {
            scanStore.setProductCode(decodedText);
            console.log(`Code matched = ${decodedText}`, decodedResult);
            navigate("/Details");
        }

        function onScanFailure(error) {}

        html5QrcodeScanner.render(onScanSuccess, onScanFailure);

        return () => {
            html5QrcodeScanner.clear();
        }

    }, [navigate]);

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px"}}>
            <div id="reader" style={{ width: "800px"}}></div>
        </div>
    )
}
export default Scan;