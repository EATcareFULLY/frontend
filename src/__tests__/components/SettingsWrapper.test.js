import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsWrapper from "../../components/SettingsWrapper";

describe('SettingWrapper Component', () => {
    it('renders children correctly', () => {

        render(
            <SettingsWrapper>
                <h1>Text 1</h1>
                <p>Text 2</p>
            </SettingsWrapper>
        );

        expect(screen.getByText("Text 1")).toBeInTheDocument();
        expect(screen.getByText("Text 2")).toBeInTheDocument();

    });

});
