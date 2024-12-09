import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useKeycloak } from "@react-keycloak/web";
import { leaderboardStore } from "../../stores/LeaderboardStore";
import Leaderboard from "../../pages/Leaderboard";

jest.mock("../../stores/LeaderboardStore", () => ({
    leaderboardStore: {
        fetchUsersLeaderboard: jest.fn(),
        fetchAnotherUsersLeaderboard: jest.fn(),
        topPositions: [],
        userContext: [],
        totalPositions: 0,
        userPosition: null,
    },
}));

jest.mock("../../components/layout/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/leaderboard/LeaderboardHeader", () => () => <div>LeaderboardHeader</div>);
jest.mock("../../components/leaderboard/LeaderboardRow", () => ({ position, username, score }) => (
    <div>{`LeaderboardRow: ${position}, ${username}, ${score}`}</div>
));
jest.mock("../../components/leaderboard/LeaderboardDivider", () => () => <div>Divider</div>);
jest.mock("../../components/leaderboard/LeaderboardSearchBar", () => ({ onSearch, onReset }) => (
    <div>
        <button onClick={() => onSearch("testuser")}>Search</button>
        <button onClick={onReset}>Reset</button>
    </div>
));
jest.mock("../../components/leaderboard/LeaderboardRules", () => () => <div>LeaderboardRules</div>);

jest.mock("@react-keycloak/web", () => ({
    useKeycloak: jest.fn(),
}));

const mockKeycloak = {
    tokenParsed: { preferred_username: "testuser" },
};

describe("Leaderboard Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak });
    });

    it("calls fetchUsersLeaderboard on mount", async () => {
        render(<Leaderboard />);
        expect(leaderboardStore.fetchUsersLeaderboard).toHaveBeenCalledTimes(1);
    });

    it("renders Loading component when no total positions are available", () => {
        leaderboardStore.totalPositions = 0;

        render(<Leaderboard />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders the leaderboard header and rows when data is available", () => {
        leaderboardStore.totalPositions = 5;
        leaderboardStore.topPositions = [
            { position: 1, username: "user1", points: 100 },
            { position: 2, username: "user2", points: 80 },
            { position: 3, username: "user3", points: 70 },
        ];
        leaderboardStore.userContext = [
            { position: 4, username: "user4", points: 40 },
        ];

        render(<Leaderboard />);

        expect(screen.getByText("LeaderboardHeader")).toBeInTheDocument();
        expect(screen.getByText("LeaderboardRow: 1, user1, 100")).toBeInTheDocument();
        expect(screen.getByText("LeaderboardRow: 2, user2, 80")).toBeInTheDocument();
        expect(screen.getByText("LeaderboardRow: 3, user3, 70")).toBeInTheDocument();
        expect(screen.getByText("LeaderboardRow: 4, user4, 40")).toBeInTheDocument();
        expect(screen.getByText("LeaderboardRules")).toBeInTheDocument();
        expect(screen.getByText("Number of people in leaderboard:")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
    });

    it("calls onSearch and fetchAnotherUsersLeaderboard when search is triggered", async () => {
        leaderboardStore.fetchAnotherUsersLeaderboard.mockResolvedValueOnce();

        render(<Leaderboard />);

        fireEvent.click(screen.getByText("Search"));

        await waitFor(() => {
            expect(leaderboardStore.fetchAnotherUsersLeaderboard).toHaveBeenCalledWith("testuser");
        });
    });

    it("calls onReset and fetchUsersLeaderboard when reset is triggered", async () => {
        leaderboardStore.fetchUsersLeaderboard.mockResolvedValueOnce();

        render(<Leaderboard />);

        fireEvent.click(screen.getByText("Reset"));

        await waitFor(() => {
            expect(leaderboardStore.fetchUsersLeaderboard).toHaveBeenCalledTimes(2); // Once on mount, once on reset
        });
    });

    it("renders Divider after topPositions when conditions are met", () => {
        leaderboardStore.totalPositions = 9;
        leaderboardStore.topPositions = [
            { position: 1, username: "user1", points: 100 },
        ];
        leaderboardStore.userContext = [
            { position: 5, username: "user18", points: 10 },
        ];

        render(<Leaderboard />);

        expect(screen.getByText("Divider")).toBeInTheDocument();
    });

    it("does not render Divider after topPositions when total position is below 2", () => {
        leaderboardStore.totalPositions = 2;
        leaderboardStore.topPositions = [
            { position: 1, username: "user1", points: 100 },
        ];
        leaderboardStore.userContext = [];

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("does not render Divider after topPositions when userContext is empty", () => {
        leaderboardStore.totalPositions = 9;
        leaderboardStore.topPositions = [
            { position: 1, username: "user1", points: 100 },
        ];
        leaderboardStore.userContext = [];

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("does not render Divider after topPositions when first userContext position is 4", () => {
        leaderboardStore.totalPositions = 9;
        leaderboardStore.topPositions = [
            { position: 1, username: "user1", points: 100 },
        ];
        leaderboardStore.userContext = [
            { position: 4, username: "user4", points: 50 },
        ];

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("renders Divider below userContext when totalPositions > 12 and userPosition + 4 < totalPositions", () => {
        leaderboardStore.totalPositions = 20;
        leaderboardStore.userContext = [];
        leaderboardStore.userPosition = 15;

        render(<Leaderboard />);

        expect(screen.getByText("Divider")).toBeInTheDocument();
    });

    it("does not render Divider below userContext when totalPositions > 12 and userPosition + 4 > totalPositions", () => {
        leaderboardStore.totalPositions = 20;
        leaderboardStore.userPosition = 18;

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("does not render Divider below userContext when totalPositions < 12 and userPosition + 4 < totalPositions", () => {
        leaderboardStore.totalPositions = 9;
        leaderboardStore.userPosition = 4;

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("renders Divider below userContext when totalPositions > 10 and userPosition < 9", () => {
        leaderboardStore.totalPositions = 11;
        leaderboardStore.userPosition = 8;

        render(<Leaderboard />);

        expect(screen.getByText("Divider")).toBeInTheDocument();
    });


    it("does not render Divider below userContext when totalPositions > 10 and userposition>9", () => {
        leaderboardStore.totalPositions = 11;
        leaderboardStore.userPosition = 10;

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });

    it("does not render Divider below userContext when totalPositions < 10", () => {
        leaderboardStore.totalPositions = 9;

        render(<Leaderboard />);

        expect(screen.queryByText("Divider")).not.toBeInTheDocument();
    });
});
