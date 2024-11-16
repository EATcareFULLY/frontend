import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LabelImageCrop from '../../components/LabelImageCrop';
import Cropper from 'cropperjs'; // Import oryginalnej klasy Cropper

jest.mock('cropperjs'); // Mockujemy Cropper

const mockImageSrcCropped = 'data:image/jpeg;base64,testbase64datacropped';
const mockImageSrc = 'data:image/jpeg;base64,testbase64data';
const mockSetImageSrc = jest.fn();
const mockSetIsCropMode = jest.fn();

describe('LabelImageCrop Component', () => {
    let mockCropperInstance;

    beforeEach(() => {
        jest.clearAllMocks();

        mockCropperInstance = {
            getCroppedCanvas: jest.fn(() => ({
                toDataURL: jest.fn(() => mockImageSrcCropped),
            })),
            destroy: jest.fn(),
        };

        Cropper.mockImplementation(() => mockCropperInstance);

        render(
            <LabelImageCrop
                imageSrc={mockImageSrc}
                setImageSrc={mockSetImageSrc}
                setIsCropMode={mockSetIsCropMode}
            />
        );
    });

    it('renders image to crop', () => {
        const image = screen.getByAltText('To Crop');
        expect(image).toBeInTheDocument();
        expect(image.src).toBe(mockImageSrc);
    });

    it('calls setIsCropMode with false when cancel is clicked', () => {
        const cancelButton = screen.getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(mockSetIsCropMode).toHaveBeenCalledWith(false);
    });

    it('calls setImageSrc and setIsCropMode with the correct arguments when save is clicked', () => {
        const saveButton = screen.getByText('Save');
        fireEvent.click(saveButton);

        expect(mockSetImageSrc).toHaveBeenCalledWith(mockImageSrcCropped);
        expect(mockSetIsCropMode).toHaveBeenCalledWith(false);
    });
});
