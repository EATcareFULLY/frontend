import React, { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

const LabelImageCrop = ({ imageSrc, setImageSrc, setIsCropMode }) => {
    const imageRef = useRef(null);
    const cropperRef = useRef(null);

    useEffect(() => {
        cropperRef.current = new Cropper(imageRef.current, {
            viewMode: 1,
            autoCropArea: 1,
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
            <img src={imageSrc} alt="To Crop" ref={imageRef} className="w-100" />
            <Button onClick={handleSave} className="mt-3 text-white">Save</Button>
            <Button onClick={handleCancel} className="mt-3 text-white">Cancel</Button>
        </>
    );
};

export default LabelImageCrop;
