import React from 'react';
import { render, screen } from '@testing-library/react';
import LabelButtonsWrapper from '../../components/LabelButtonsWrapper';

describe('LabelButtonsWrapper', () => {
    it('renders children correctly', () => {

        render(
            <LabelButtonsWrapper>
                <button>Button 1</button>
                <button>Button 2</button>
            </LabelButtonsWrapper>
        );

        const button1 = screen.getByText('Button 1');
        const button2 = screen.getByText('Button 2');

        expect(button1).toBeInTheDocument();
        expect(button2).toBeInTheDocument();

    });

});
