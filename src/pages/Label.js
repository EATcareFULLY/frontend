import React, { useState } from 'react';
import LabelCameraPermissions from '../components/LabelCameraPermissions';
import LabelCameraCapture from '../components/LabelCameraCapture';
import LabelImage from '../components/LabelImage';
import LabelImageCrop from '../components/LabelImageCrop';
import {Card} from "react-bootstrap";
import CameraComponentsWrapper from "../components/CameraComponentsWrapper";

//TODO - testy i keycloak refresh token

const Label = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [isCropMode, setIsCropMode] = useState(false);


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

        </div>


    );
};

export default Label;
