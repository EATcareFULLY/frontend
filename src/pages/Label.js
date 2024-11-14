import React, { useState } from 'react';
import LabelCameraPermissions from '../components/LabelCameraPermissions';
import LabelCameraCapture from '../components/LabelCameraCapture';
import LabelImage from '../components/LabelImage';
import LabelImageCrop from '../components/LabelImageCrop';
import {Card} from "react-bootstrap";

//TODO - odbior odpowiedzi i testy

const Label = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [isCropMode, setIsCropMode] = useState(false);


    //consider container as a wrapper

    return (
        <div>
            <div className="row justify-content-center mt-2">
                <div className="col-md-8 text-center">
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
                </div>
            </div>

        </div>


    );
};

export default Label;
