import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from '../../pages/Label';

jest.mock('../../components/LabelCameraPermissions', () => () => <h1>LabelCameraPermissions</h1>);
jest.mock('../../components/LabelCameraCapture', () => () => <h1>LabelCameraCapture</h1>);
jest.mock('../../components/LabelImage', () => () => <h1>LabelImage</h1>);
jest.mock('../../components/LabelImageCrop', () => () => <h1>LabelImageCrop</h1>);

const mockSetState = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn((initial) => [initial, mockSetState]),
}));

describe('Label Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders CameraComponentsWrapper and heading', () => {
        React.useState
            .mockImplementationOnce(() => [false, mockSetState]) // Set permissionsGranted to false
            .mockImplementationOnce(() => [null, mockSetState]) // imageSrc = null
            .mockImplementationOnce(() => [false, mockSetState]); // isCropMode = false
        render(<Label />);

        expect(screen.getByText('Analyze label from photo')).toBeInTheDocument();
    });

    it('renders LabelCameraPermissions when permissions are not granted', () => {
        React.useState
            .mockImplementationOnce(() => [false, mockSetState]) // Set permissionsGranted to false
            .mockImplementationOnce(() => [null, mockSetState]) // imageSrc = null
            .mockImplementationOnce(() => [false, mockSetState]); // isCropMode = false
        render(<Label />);

        expect(screen.getByText('LabelCameraPermissions')).toBeInTheDocument();
    });

    it('renders LabelCameraCapture when permissions are granted and no imageSrc is set', () => {
        React.useState
            .mockImplementationOnce(() => [true, mockSetState]) // permissionsGranted = true
            .mockImplementationOnce(() => [null, mockSetState]) // imageSrc = null
            .mockImplementationOnce(() => [false, mockSetState]); // isCropMode = false

        render(<Label />);

        expect(screen.getByText('LabelCameraCapture')).toBeInTheDocument();
    });

    it('renders LabelImage when imageSrc is set and isCropMode is false', () => {
        React.useState
            .mockImplementationOnce(() => [true, mockSetState]) // permissionsGranted = true
            .mockImplementationOnce(() => ['mockImageSrc', mockSetState]) // imageSrc = mockImageSrc
            .mockImplementationOnce(() => [false, mockSetState]); // isCropMode = false

        render(<Label />);

        expect(screen.getByText('LabelImage')).toBeInTheDocument();
    });

    it('renders LabelImageCrop when imageSrc is set and isCropMode is true', () => {
        React.useState
            .mockImplementationOnce(() => [true, mockSetState]) // permissionsGranted = true
            .mockImplementationOnce(() => ['mockImageSrc', mockSetState]) // imageSrc = mockImageSrc
            .mockImplementationOnce(() => [true, mockSetState]); // isCropMode = true

        render(<Label />);

        expect(screen.getByText('LabelImageCrop')).toBeInTheDocument();
    });
});
