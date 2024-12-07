import { render, screen } from "@testing-library/react";
import LeaderboardRow from "../../components/LeaderboardRow";

describe("LeaderboardRow Component", () => {

    it("should render position, username, and score correctly", () => {
        render(<LeaderboardRow position={1} username="JohnDoe" score={100} isCurrentUser={false} />);

        expect(screen.getByText("1.")).toBeInTheDocument();
        expect(screen.getByText("JohnDoe")).toBeInTheDocument();
        expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("should return 'bg-gold' for position 1", () => {
        const { container } = render(<LeaderboardRow position={1} username="JohnDoe" score={100} isCurrentUser={false} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('bg-gold')).toBe(true);
    });

    it("should return 'bg-silver' for position 2", () => {
        const { container } = render(<LeaderboardRow position={2} username="JaneDoe" score={95} isCurrentUser={false} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('bg-silver')).toBe(true);
    });

    it("should return 'bg-bronze' for position 3", () => {
        const { container } = render(<LeaderboardRow position={3} username="JimDoe" score={90} isCurrentUser={false} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('bg-bronze')).toBe(true);
    });

    it("should not apply any background color for other positions", () => {
        const { container } = render(<LeaderboardRow position={4} username="OtherUser" score={85} isCurrentUser={false} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('bg-gold')).toBe(false);
        expect(row.classList.contains('bg-silver')).toBe(false);
        expect(row.classList.contains('bg-bronze')).toBe(false);
    });

    it("should apply 'bg-primary-subtle' class for current user", () => {
        const { container } = render(<LeaderboardRow position={4} username="OtherUser" score={85} isCurrentUser={true} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('bg-primary-subtle')).toBe(true);
    });

    it("should apply 'font-bold' class for current user", () => {
        const { container } = render(<LeaderboardRow position={4} username="OtherUser" score={85} isCurrentUser={true} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('font-bold')).toBe(true);
    });

    it("should not apply 'font-bold' for non-current user", () => {
        const { container } = render(<LeaderboardRow position={4} username="OtherUser" score={85} isCurrentUser={false} />);
        const row = container.querySelector('div');
        expect(row.classList.contains('font-bold')).toBe(false);
    });

});