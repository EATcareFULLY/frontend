import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LabelCameraPermissions from '../../../components/label/LabelCameraPermissions';
import { errorToast } from '../../utils/Toasts';

jest.mock('../../utils/Toasts', () => ({
    errorToast: jest.fn(),
}));

describe('LabelCameraPermissions Component', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        global.navigator.mediaDevices = {
            getUserMedia: jest.fn(),
        };
    });

    it('renders the camera permission message and button', () => {
        render(<LabelCameraPermissions setPermissionsGranted={jest.fn()} />);

        const message = screen.getByText(/To use this feature, camera access is required/i);
        expect(message).toBeInTheDocument();

        const button = screen.getByText('Request Camera Permissions');
        expect(button).toBeInTheDocument();
    });

    it('sets permissions to granted when camera permissions are given', async () => {
        global.navigator.mediaDevices.getUserMedia.mockResolvedValue({
            getTracks: jest.fn().mockReturnValue([{ stop: jest.fn() }]),
        });

        const setPermissionsGranted = jest.fn();

        render(<LabelCameraPermissions setPermissionsGranted={setPermissionsGranted} />);

        const button = screen.getByText('Request Camera Permissions');
        fireEvent.click(button);

        await waitFor(() => expect(setPermissionsGranted).toHaveBeenCalledWith(true));
    });

});
