import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import LabelButtonsWrapper from "./LabelButtonsWrapper";
import LabelImgWrapper from "./LabelImgWrapper";

const LabelImageCrop = ({ imageSrc, setImageSrc, setIsCropMode }) => {
    const imageRef = useRef(null);
    const cropperRef = useRef(null);

    useEffect(() => {
        cropperRef.current = new Cropper(imageRef.current, {
            viewMode: 1,
            autoCropArea: 0.99,
            responsive: true,
            background: false,
            guides: true,
        });
        return () => cropperRef.current && cropperRef.current.destroy();
    }, []);

    const handleSave = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.getCroppedCanvas();
            const croppedImage = croppedCanvas.toDataURL('image/jpeg');
            setImageSrc(croppedImage);
            setIsCropMode(false);
        }
    };

    const handleCancel = () => setIsCropMode(false);

    return (
        <>
            <LabelImgWrapper>
                <img
                    src={imageSrc}
                    alt="To Crop"
                    ref={imageRef}
                    className="w-100"
                    style={{maxHeight: '80vh', objectFit: 'contain'}}
                />
            </LabelImgWrapper>
            <LabelButtonsWrapper>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </LabelButtonsWrapper>
        </>
    );
};

export default LabelImageCrop;
