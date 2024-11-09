import React, { useEffect, useState } from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from 'react-bootstrap';
import {warningToast} from "../utils/Toasts";
import {labelStore} from "../stores/LabelStore";

//TODO - logika pozwoleń, obcinanie zdjęcia, flash, wysylanie pliku, odbior odpowiedzi

const LabelCamera = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [cameraCount, setCameraCount] = useState(0);
    const cameraRef = React.useRef(null);

    // Check for previously granted permissions on load
    useEffect(() => {
        const grantedPreviously = localStorage.getItem("cameraPermissionsGranted");
        if (grantedPreviously === "true") {
            setPermissionsGranted(true);
        }
    }, []);

    // Request camera permissions
    const handleRequestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setPermissionsGranted(true);
            localStorage.setItem("cameraPermissionsGranted", "true");
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            warningToast("Could not get camera permission granted");
        }
    };

    const handleCapture = () => {
        const image = cameraRef.current.takePhoto();
        setImageSrc(image);
        labelStore.setLabelImg(image);
    };

    const handleSwitchCamera = () => {
        cameraRef.current.switchCamera();
    };

    return (
        <div className="text-center">
            <h2>Scan Barcode</h2>
            {!permissionsGranted ? (
                <Button onClick={handleRequestPermissions} className="mt-3">
                    Request Camera Permissions
                </Button>
            ) : (
                !imageSrc ? (
                    <>
                        <Camera
                            ref={cameraRef}
                            facingMode={'environment'}
                            aspectRatio={16 / 9}
                            numberOfCamerasCallback={setCameraCount}
                            className="w-100"
                        />
                        <Button onClick={handleCapture} className="mt-3 text-white">
                            Capture Photo
                        </Button>
                        {cameraCount > 1 && (
                            <Button onClick={handleSwitchCamera} className="mt-3 ml-3 text-white">
                                Switch Camera
                            </Button>
                        )}
                    </>
                ) : (
                    <>
                        <img src={imageSrc} alt="Captured" className="w-100" />
                        <Button onClick={() => setImageSrc(null)} className="mt-3 text-white mr-2">
                            Retake Photo
                        </Button>
                        <Button onClick={() => labelStore.analyzeLabelFromImage()} className="mt-3 text-white">
                            Analyze Label
                        </Button>
                    </>
                )
            )}
        </div>
    );
};

export default LabelCamera;
