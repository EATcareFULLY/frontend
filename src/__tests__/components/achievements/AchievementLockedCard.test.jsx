import { render, screen } from "@testing-library/react";
import React from "react";
import AchievementLockedCard from "../../../components/achievements/AchievementLockedCard";
import locked from '../../../assets/achivement-badges/locked.svg'

describe("AchievementLockedCard Component", () => {
    it("renders the locked achievement correctly", () => {
        render(<AchievementLockedCard />);

        expect(screen.getByAltText("locked-photo")).toHaveAttribute("src", locked);
        expect(screen.getByText("Locked")).toBeInTheDocument();
        expect(screen.getByText("Progress further to uncover this achievement.")).toBeInTheDocument();
    });
});
