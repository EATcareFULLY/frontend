import React, {useState} from 'react';
import LabelCameraPermissions from '../components/label/LabelCameraPermissions';
import LabelCameraCapture from '../components/label/LabelCameraCapture';
import LabelImage from '../components/label/LabelImage';
import LabelImageCrop from '../components/label/LabelImageCrop';
import {Card} from "react-bootstrap";
import CameraComponentsWrapper from "../components/label/CameraComponentsWrapper";
import LabelForm from "../components/label/LabelForm";
import {useNavigate} from "react-router-dom";

const Label = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [isCropMode, setIsCropMode] = useState(false);

    const navigate = useNavigate();

    const labelSubmition = () => {
        navigate("/LabelAnalysis");
    };

    //consider container as a wrapper

    return (

            <div>
            <CameraComponentsWrapper>
                <h2>Analyze label from photo</h2>
                <Card className="mt-3" style={{backgroundColor: "var(--bs-secondary-bg-subtle)"}}>
                    {!permissionsGranted && (
                        <LabelCameraPermissions
                            setPermissionsGranted={setPermissionsGranted}
                        />
                    )}
                    {permissionsGranted && !imageSrc && (
                        <LabelCameraCapture
                            setImageSrc={setImageSrc}
                            setIsCropMode={setIsCropMode}
                        />
                    )}
                    {imageSrc && !isCropMode && (
                        <LabelImage
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            setIsCropMode={setIsCropMode}
                            labelSubmition={labelSubmition}
                        />
                    )}
                    {imageSrc && isCropMode && (
                        <LabelImageCrop
                            imageSrc={imageSrc}
                            setImageSrc={setImageSrc}
                            setIsCropMode={setIsCropMode}
                        />
                    )}
                </Card>
            </CameraComponentsWrapper>
            <div className="row justify-content-center mt-4">
                <div className="col-md-6">
                    <h2>No camera? Input label here</h2>
                    <LabelForm labelSubmition={labelSubmition}/>
                </div>
            </div>
        </div>


    );
};

export default Label;
