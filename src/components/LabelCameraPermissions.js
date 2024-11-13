import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { warningToast } from '../utils/Toasts';

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
        } catch {
            warningToast("Could not get camera permission granted");
        }
    };

    return (
        <Button onClick={handleRequestPermissions} className="mt-3 text-white">
            Request Camera Permissions
        </Button>
    );
};

export default LabelCameraPermissions;
