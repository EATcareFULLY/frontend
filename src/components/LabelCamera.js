import React, { useEffect, useState } from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from 'react-bootstrap';
import {warningToast} from "../utils/Toasts";
import {labelStore} from "../stores/LabelStore";

//TODO - obcinanie zdjęcia, flash (opcjonalnie), odbior odpowiedzi

const LabelCamera = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [cameraCount, setCameraCount] = useState(0);
    const cameraRef = React.useRef(null);


    useEffect(() => {
        const checkCameraPermission = async () => {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'camera' });

                console.log(permissionStatus);

                if (permissionStatus.state === 'granted') {
                    setPermissionsGranted(true);
                } else if (permissionStatus.state === 'prompt') {
                    setPermissionsGranted(false);
                } else if (permissionStatus.state === 'denied') {
                    warningToast("Camera access denied. Please enable access in your settings.");
                }

                permissionStatus.onchange = () => {
                    setPermissionsGranted(permissionStatus.state === 'granted');
                };
            } catch (error) {
                console.error("Permission API not supported in this browser so permissions will be asked automatically.", error);
                setPermissionsGranted(true); //allegedly ios does not support permission queries - not tested - may want to change that later q(>u<)p
            }
        };

        checkCameraPermission();
    }, []);

    const handleRequestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setPermissionsGranted(true);
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
            <h2>Analyze label from photo</h2>
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
                        <img src={imageSrc} alt="Captured" className="w-100"/>
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
