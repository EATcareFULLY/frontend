import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { labelStore } from '../../stores/LabelStore';
import { useNavigate } from 'react-router-dom';
import LabelImage from '../../components/LabelImage';

jest.mock('../../stores/LabelStore', () => ({
    labelStore: {
        setLabelImg: jest.fn(),
    },
}));

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../components/LabelButtonsWrapper', () => ({ children }) => <div>{children}</div>);
jest.mock('../../components/LabelImgWrapper', () => ({ children }) => <div>{children}</div>);

describe('LabelImage Component', () => {
    const mockNavigate = jest.fn();
    const mockSetImageSrc = jest.fn();
    const mockSetIsCropMode = jest.fn();
    const mockLabelSubmition = jest.fn();
    const mockImageSrc = 'mockImage.png';

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();

        render(
            <LabelImage
                imageSrc={mockImageSrc}
                setImageSrc={mockSetImageSrc}
                setIsCropMode={mockSetIsCropMode}
                labelSubmition={mockLabelSubmition}
            />
        );
    });

    it('renders the image with the correct src and alt attributes', () => {
        const imgElement = screen.getByAltText('Captured');

        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', mockImageSrc);
        expect(imgElement).toHaveAttribute('alt', 'Captured');
    });

    it('renders buttons correctly', () => {
        const retakeButton = screen.getByText('Retake Photo');
        const cropButton = screen.getByText('Crop Photo');
        const analyzeButton = screen.getByText('Analyze Label');

        expect(retakeButton).toBeInTheDocument();
        expect(cropButton).toBeInTheDocument();
        expect(analyzeButton).toBeInTheDocument();
    });

    it('calls setImageSrc with null when Retake Photo button is clicked', () => {
        const retakeButton = screen.getByText('Retake Photo');
        fireEvent.click(retakeButton);

        expect(mockSetImageSrc).toHaveBeenCalledWith(null);
    });

    it('calls setIsCropMode with true when Crop Photo button is clicked', () => {
        const cropButton = screen.getByText('Crop Photo');
        fireEvent.click(cropButton);

        expect(mockSetIsCropMode).toHaveBeenCalledWith(true);
    });

    it('calls setLabelImg and labelSubmition when Analyze Label button is clicked', () => {
        const analyzeButton = screen.getByText('Analyze Label');
        fireEvent.click(analyzeButton);

        expect(labelStore.setLabelImg).toHaveBeenCalledWith(mockImageSrc);
        expect(mockLabelSubmition).toHaveBeenCalled();
    });
});
