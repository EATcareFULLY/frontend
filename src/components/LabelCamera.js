import React, {useEffect, useRef, useState} from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from 'react-bootstrap';
import {warningToast} from "../utils/Toasts";
import Cropper from 'cropperjs';
import {labelStore} from "../stores/LabelStore";
import 'cropperjs/dist/cropper.css';

//TODO - obcinanie zdjęcia, stylowanie, odbior odpowiedzi, flash (nie dziala na wiekszosci urzadzen - raczej odpuszczamy)

const LabelCamera = () => {
    const [permissionsGranted, setPermissionsGranted] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [cameraCount, setCameraCount] = useState(0);
    const [isCropMode, setIsCropMode] = useState(false);
    const cameraRef = useRef(null);
    const imageRef = useRef(null);
    const cropperRef = useRef(null);


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
                    setPermissionsGranted(false);
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
        setIsCropMode(false);
    };

    const handleSwitchCamera = () => {
        cameraRef.current.switchCamera();
    };

    const enableCropMode = () => {
        setIsCropMode(true);
        setTimeout(() => {
            if (imageRef.current && !cropperRef.current) {
                cropperRef.current = new Cropper(imageRef.current, {
                    viewMode: 1,
                    autoCropArea: 1,
                    responsive: true,
                    background: false,
                    guides: true
                });
            }
        }, 0);
    };

    const handleCropImage = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.getCroppedCanvas();
            const base64Image = croppedCanvas.toDataURL('image/jpeg');
            setImageSrc(base64Image);
            labelStore.setLabelImg(base64Image);
            setIsCropMode(false);
            cropperRef.current.destroy();
            cropperRef.current = null;
        }
    };

    const handleCancelCropping = () => {
        setIsCropMode(false);
        cropperRef.current.destroy();
        cropperRef.current = null;
    };

    return (
        <div className="text-center">
            <h2>Analyze label from photo</h2>
            {!permissionsGranted ? (
                <Button onClick={handleRequestPermissions} className="mt-3 text-white">
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

                        <img
                            src={imageSrc}
                            alt="Captured"
                            ref={imageRef}
                            className="w-100"
                        />
                        {!isCropMode && (
                            <>
                                <Button onClick={() => setImageSrc(null)} className="mt-3 text-white">
                                    Retake Photo
                                </Button>
                                <Button onClick={enableCropMode} className="mt-3 ml-3 text-white">
                                    Crop Photo
                                </Button>
                                <Button onClick={() => labelStore.analyzeLabelFromImage()} className="mt-3 ml-3 text-white">
                                    Analyze Label
                                </Button>
                            </>
                        )}
                        {isCropMode && (
                            <>
                                <Button onClick={handleCropImage} className="mt-3 text-white">
                                    Save
                                </Button>
                                <Button onClick={handleCancelCropping} className="mt-3 text-white">
                                    Cancel
                                </Button>
                            </>
                        )}
                    </>
                )
            )}
        </div>
    );
};

export default LabelCamera;
