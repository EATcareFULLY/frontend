import { render, screen } from "@testing-library/react";
import LeaderboardCell from "../../../components/leaderboard/LeaderboardCell";

describe("LeaderboardCell Component", () => {
    it("should render children inside the component", () => {
        render(
            <LeaderboardCell>
                <span>Test Content</span>
            </LeaderboardCell>
        );

        expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should apply the provided style", () => {
        render(
            <LeaderboardCell width="200px">
                <span>Width Test</span>
            </LeaderboardCell>
        );

        const cell = screen.getByText("Width Test").parentElement;
        expect(cell).toHaveStyle({ width: "200px" });
    });

    it("should apply the provided className", () => {
        render(
            <LeaderboardCell className="test-class">
                <span>Class Test</span>
            </LeaderboardCell>
        );

        const cell = screen.getByText("Class Test").parentElement;
        expect(cell).toHaveClass("test-class");
    });
});