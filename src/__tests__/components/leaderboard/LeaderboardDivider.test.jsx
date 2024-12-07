import { render, screen } from "@testing-library/react";
import LeaderboardDivider from "../../../components/leaderboard/LeaderboardDivider";

describe("LeaderboardDivider Component", () => {
    it("should render the BsThreeDots icon", () => {
        render(<LeaderboardDivider />);

        const icon = screen.getByTestId("divider-icon");
        expect(icon).toBeInTheDocument();
    });

});