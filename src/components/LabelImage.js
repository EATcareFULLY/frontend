import React from 'react';
import { Button } from 'react-bootstrap';
import { labelStore } from '../stores/LabelStore';

const LabelImage = ({ imageSrc, setImageSrc, setIsCropMode }) => {

    const enableCropMode = () => setIsCropMode(true);

    const resetImage = () => setImageSrc(null);

    const analyzeLabel = () => labelStore.analyzeLabelFromImage(imageSrc);

    return (
        <div>
            <img src={imageSrc} alt="Captured" className="w-100" />
            <Button onClick={resetImage} className="mt-3 text-white">
                Retake Photo
            </Button>
            <Button onClick={enableCropMode} className="mt-3 ml-3 text-white">
                Crop Photo
            </Button>
            <Button onClick={analyzeLabel} className="mt-3 ml-3 text-white">
                Analyze Label
            </Button>
        </div>
    );
}

export default LabelImage;
