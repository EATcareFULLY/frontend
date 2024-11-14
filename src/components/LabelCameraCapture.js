import React, {useRef, useState} from 'react';
import { Camera } from 'react-camera-pro';
import { Button } from 'react-bootstrap';

const LabelCameraCapture = ({setImageSrc, setIsCropMode}) => {
    const [cameraCount, setCameraCount] = useState(0);
    const cameraRef = useRef(null);

    const handleCapture = () => {
        const image = cameraRef.current.takePhoto();
        setImageSrc(image);
        setIsCropMode(false);
    };

    const handleSwitchCamera = () => {
        cameraRef.current.switchCamera();
    };

    const errorMessages = {
        noCameraAccessible: 'No camera device accessible.',
        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
        switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
        canvas: 'Canvas is not supported.'
    }

    return (
        <div>
            <div className="bg-black">
                <Camera
                    ref={cameraRef}
                    facingMode="environment"
                    aspectRatio={4 / 3}
                    numberOfCamerasCallback={setCameraCount}
                    className="w-100"
                    errorMessages={errorMessages}
                    style={{maxHeight: '100vh', objectFit: 'contain'}}
                />
            </div>
            <div>
                <div className="p-3">
                    {cameraCount > 0 && (
                        <Button onClick={handleCapture}>
                            Capture Photo
                        </Button>
                    )}
                    {cameraCount > 1 && (
                        <Button onClick={handleSwitchCamera} className=" ml-3 ">
                            Switch Camera
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );


}


export default LabelCameraCapture;
