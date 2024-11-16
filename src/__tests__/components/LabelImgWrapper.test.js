import React from 'react';
import { render, screen } from '@testing-library/react';
import LabelImgWrapper from '../../components/LabelImgWrapper';

describe('LabelImgWrapper Component', () => {

    let container;

    beforeEach(() => {
        const renderResult = render(
            <LabelImgWrapper>
                <p>Test Child Component</p>
            </LabelImgWrapper>
        );
        container = renderResult.container;
    });

    it('renders children correctly', () => {
        const childElement = screen.getByText('Test Child Component');
        expect(childElement).toBeInTheDocument();
    });

    it('should render with a black background', () => {
        expect(container.firstChild).toHaveClass('bg-black');
    });
});
