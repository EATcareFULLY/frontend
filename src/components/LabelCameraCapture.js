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

    return (
        <div>
            <Camera
                ref={cameraRef}
                facingMode="environment"
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
        </div>
    );


}


export default LabelCameraCapture;
