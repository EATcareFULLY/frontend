import React from 'react';
import { Button } from 'react-bootstrap';
import { labelStore } from '../../stores/LabelStore';
import LabelButtonsWrapper from "./LabelButtonsWrapper";
import LabelImgWrapper from "./LabelImgWrapper";

const LabelImage = ({ imageSrc, setImageSrc, setIsCropMode, labelSubmition }) => {

    const enableCropMode = () => setIsCropMode(true);

    const resetImage = () => setImageSrc(null);

    const analyzeLabel = () => {
        labelStore.setLabelImg(imageSrc);
        labelSubmition();
    }

    return (
        <div>
            <LabelImgWrapper>
                <img
                    src={imageSrc}
                    alt="Captured"
                    className="w-100"
                    style={{maxHeight: '110vh', objectFit: 'contain'}}
                />
            </LabelImgWrapper>
            <LabelButtonsWrapper>
                <Button onClick={resetImage}>
                    Retake Photo
                </Button>
                <Button onClick={enableCropMode}>
                Crop Photo
                </Button>
                <Button onClick={analyzeLabel}>
                    Analyze Label
                </Button>
            </LabelButtonsWrapper>
        </div>
    );
}

export default LabelImage;
