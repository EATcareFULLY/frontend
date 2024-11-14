import React from 'react';
import { Button } from 'react-bootstrap';
import { labelStore } from '../stores/LabelStore';

const LabelImage = ({ imageSrc, setImageSrc, setIsCropMode }) => {

    const enableCropMode = () => setIsCropMode(true);

    const resetImage = () => setImageSrc(null);

    const analyzeLabel = () => labelStore.analyzeLabelFromImage(imageSrc);

    return (
        <div>
            <div className="bg-black p-0">
                <img
                    src={imageSrc}
                    alt="Captured"
                    className="w-100 m-0 p-0"
                    style={{maxHeight: '110vh', objectFit: 'contain'}}
                />
            </div>
            <div>
                <div className="p-3">
                    <Button onClick={resetImage}>
                    Retake Photo
                    </Button>
                    <Button onClick={enableCropMode} className="ml-3 ">
                        Crop Photo
                    </Button>
                    <Button onClick={analyzeLabel} className="ml-3">
                        Analyze Label
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LabelImage;
