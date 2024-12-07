import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LabelCameraCapture from '../../../components/label/LabelCameraCapture';

let mockNumberOfCameras;
const mockSetImageSrc = jest.fn();
const mockSetIsCropMode = jest.fn();
const mockSwitchCamera = jest.fn();
const cameraRef = React.createRef();
cameraRef.current = {
    switchCamera: mockSwitchCamera,
};

const mockRender = () => {
    render(
        <LabelCameraCapture
            setImageSrc={mockSetImageSrc}
            setIsCropMode={mockSetIsCropMode}
        />
    );
}

jest.mock('react-camera-pro', () => {
    const React = require('react');
    return {
        Camera: React.forwardRef((props, ref) => {
            const { numberOfCamerasCallback } = props;

            React.useImperativeHandle(ref, () => ({
                takePhoto: jest.fn(() => 'mocked-photo'),
                switchCamera: jest.fn(mockSwitchCamera),
            }));

            React.useEffect(() => {
                numberOfCamerasCallback && numberOfCamerasCallback(mockNumberOfCameras);
            }, [numberOfCamerasCallback]);

            return <div data-testid="camera-component" />;
        }),
    };
});

describe('LabelCameraCapture Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the Camera component', () => {
        mockNumberOfCameras = 1;
        mockRender();

        expect(screen.getByTestId('camera-component')).toBeInTheDocument();
    });

    it('displays Capture Photo button when camera is available', () => {
        mockNumberOfCameras = 1;
        mockRender();

        const captureButton = screen.getByText('Capture Photo');
        expect(captureButton).toBeInTheDocument();
    });

    it('does not display Capture Photo button when no camera is available', () => {
        mockNumberOfCameras = 0;
        mockRender();

        const captureButton = screen.queryByText('Capture Photo');
        expect(captureButton).not.toBeInTheDocument();
    });

    it('calls setImageSrc and setIsCropMode when Capture Photo is clicked', () => {
        mockNumberOfCameras = 1;
        mockRender();

        const captureButton = screen.getByText('Capture Photo');
        fireEvent.click(captureButton);

        expect(mockSetImageSrc).toHaveBeenCalledWith('mocked-photo');
        expect(mockSetIsCropMode).toHaveBeenCalledWith(false);
    });

    it('displays Switch Camera button when more than one camera is available', () => {
        mockNumberOfCameras = 2;
        mockRender();

        const switchCameraButton = screen.getByText('Switch Camera');
        expect(switchCameraButton).toBeInTheDocument();
    });

    it('does not display Switch Camera button when only one camera is available', () => {
        mockNumberOfCameras = 1;
        mockRender();

        const switchCameraButton = screen.queryByText('Switch Camera');
        expect(switchCameraButton).not.toBeInTheDocument();
    });

    it('calls switchCamera when Switch Camera is clicked', () => {
        mockNumberOfCameras = 2;
        mockRender();

        const switchCameraButton = screen.getByText('Switch Camera');
        fireEvent.click(switchCameraButton);

        expect(mockSwitchCamera).toHaveBeenCalled();
    });
});
