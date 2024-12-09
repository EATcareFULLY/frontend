import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {errorToast} from '../../utils/Toasts';

const LabelCameraPermissions = ({setPermissionsGranted }) => {
    useEffect(() => {
        const checkCameraPermission = async () => {
            try {
                const permissionStatus = await navigator.permissions.query({ name: 'camera' });
                setPermissionsGranted(permissionStatus.state === 'granted');

                permissionStatus.onchange = () => {
                    setPermissionsGranted(permissionStatus.state === 'granted');
                };
            } catch (error) {
                console.error("Permissions API not supported", error);
                setPermissionsGranted(true); // Assume true if the Permissions API is unsupported.
            }
        };
        checkCameraPermission();
    }, [setPermissionsGranted]);

    const handleRequestPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setPermissionsGranted(true);
            stream.getTracks().forEach(track => track.stop());
        } catch (error) {
            if (error.name === 'NotFoundError') {
                errorToast("No camera devices found.");
            } else {
                errorToast("Could not get camera permission granted");
            }
        }
    };

    return (
        <div className="p-3 text-center">
            <p className="w-75 mx-auto">
                To use this feature, camera access is required, so please allow camera permissions.
                Without camera access, this functionality will be unavailable.
            </p>
            <Button onClick={handleRequestPermissions} >
                Request Camera Permissions
            </Button>
        </div>
    );
};

export default LabelCameraPermissions;
