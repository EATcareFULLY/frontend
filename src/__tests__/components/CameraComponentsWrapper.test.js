import React from 'react';
import { render, screen } from '@testing-library/react';
import CameraComponentsWrapper from '../../components/CameraComponentsWrapper';

describe('CameraComponentsWrapper Component', () => {
    it('renders children correctly', () => {
        render(
            <CameraComponentsWrapper>
                <p>Test Child Component</p>
            </CameraComponentsWrapper>
        );

        const childElement = screen.getByText('Test Child Component');
        expect(childElement).toBeInTheDocument();
    });
});
