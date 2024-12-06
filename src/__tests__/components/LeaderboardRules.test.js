import { render, screen, fireEvent } from "@testing-library/react";
import LeaderboardRules from "../../components/LeaderboardRules";

describe("LeaderboardRules Component", () => {

    it("should render the title and the initial collapse icon", () => {
        render(<LeaderboardRules />);
        expect(screen.getByText("Leaderboard Rules and Scoring")).toBeInTheDocument();
        expect(screen.getByTestId("icon-right")).toBeInTheDocument();
    });

    it("should handle toggle the collapse state when clicked correctly", () => {
        render(<LeaderboardRules />);

        let toggleButtonRight = screen.getByTestId("icon-right");

        fireEvent.click(toggleButtonRight);

        const toggleButtonDown = screen.getByTestId("icon-down");

        expect(toggleButtonDown).toBeInTheDocument();
        expect(toggleButtonRight).not.toBeInTheDocument();

        fireEvent.click(toggleButtonDown);

        toggleButtonRight = screen.getByTestId("icon-right");

        expect(toggleButtonDown).not.toBeInTheDocument();
        expect(toggleButtonRight).toBeInTheDocument();
    });

    it("should display the correct content when expanded", () => {
        render(<LeaderboardRules />);

        const toggleButton = screen.getByTestId("icon-right");

        fireEvent.click(toggleButton);

        expect(screen.getByText("Points for products:")).toBeInTheDocument();
        expect(screen.getByText("Leaderboard reset:")).toBeInTheDocument();
        expect(screen.getByText("Weekly scoring limitation:")).toBeInTheDocument();
    });

});
