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
            guides: false,
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
            <div className="bg-black">
                <img
                    src={imageSrc}
                    alt="To Crop"
                    ref={imageRef}
                    className="w-100"
                    style={{maxHeight: '80vh', objectFit: 'contain'}}
                />
            </div>
            <div>
                <div className="p-3">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleSave} className="ml-3">Save</Button>
                </div>
            </div>
        </>
    );
};

export default LabelImageCrop;
