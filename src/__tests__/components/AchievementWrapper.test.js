import React from 'react';
import { render, screen } from '@testing-library/react';
import AchievementWrapper from "../../components/AchievementWrapper";

describe('AchievementWrapper Component', () => {
    it('renders children correctly', () => {

        render(
            <AchievementWrapper>
                <h1>Text 1</h1>
                <p>Text 2</p>
            </AchievementWrapper>
        );

        expect(screen.getByText("Text 1")).toBeInTheDocument();
        expect(screen.getByText("Text 2")).toBeInTheDocument();

    });

});
