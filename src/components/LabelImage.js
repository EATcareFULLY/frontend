import React from 'react';
import { Button } from 'react-bootstrap';
import { labelStore } from '../stores/LabelStore';
import LabelButtonsWrapper from "./LabelButtonsWrapper";
import LabelImgWrapper from "./LabelImgWrapper";
import {useNavigate} from "react-router-dom";

const LabelImage = ({ imageSrc, setImageSrc, setIsCropMode }) => {
    const navigate = useNavigate();

    const enableCropMode = () => setIsCropMode(true);

    const resetImage = () => setImageSrc(null);

    const analyzeLabel = () => {
        labelStore.analyzeNewLabelFromImage(imageSrc);
        navigate('/LabelAnalysis');
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
