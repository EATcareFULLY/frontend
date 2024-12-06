import { render, screen } from "@testing-library/react";
import LeaderboardHeader from "../../components/LeaderboardHeader";

describe("LeaderboardHeader Component", () => {
    it("should render the columns correctly", () => {
        render(<LeaderboardHeader />);
        expect(screen.getByText("#")).toBeInTheDocument();
        expect(screen.getByText("Username")).toBeInTheDocument();
        expect(screen.getByText("Points")).toBeInTheDocument();
    });

});
