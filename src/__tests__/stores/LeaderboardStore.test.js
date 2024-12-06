import ApiService from "../../services/ApiService";
import {leaderboardStore} from "../../stores/LeaderboardStore";

jest.mock("../../services/ApiService");

const getMockLeaderboard = () => {
    return {
        topPositions: [
            "User1", "User2", "User3"
        ],
        userContext: [
            "User9", "User10", "User11", "YOU", "User13", "User14","User15","User16",
        ],
        userPosition : 12,
        totalPositions: 16
    }
}


describe("LeaderboardStore", () => {
    beforeEach(() => {
        leaderboardStore.setLeaderboard([], []);
        jest.clearAllMocks();
    });

    it("should set leaderboard", () => {
        const leaderboard = getMockLeaderboard();
        leaderboardStore.setLeaderboard(leaderboard.topPositions, leaderboard.userContext, leaderboard.userPosition, leaderboard.totalPositions);

        expect(leaderboardStore.topPositions).toEqual(leaderboard.topPositions);
        expect(leaderboardStore.userContext).toEqual(leaderboard.userContext);
        expect(leaderboardStore.userPosition).toEqual(leaderboard.userPosition);
        expect(leaderboardStore.totalPositions).toEqual(leaderboard.totalPositions);

    });

    it("should fetch users leaderboard", async () => {
        const leaderboard = getMockLeaderboard();
        ApiService.getLeaderboard.mockResolvedValue(leaderboard);

        await leaderboardStore.fetchUsersLeaderboard();

        expect(ApiService.getLeaderboard).toHaveBeenCalled();
        expect(leaderboardStore.topPositions).toEqual(leaderboard.topPositions);
        expect(leaderboardStore.userContext).toEqual(leaderboard.userContext);
        expect(leaderboardStore.userPosition).toEqual(leaderboard.userPosition);
        expect(leaderboardStore.totalPositions).toEqual(leaderboard.totalPositions);

    });

    it("should fetch another users leaderboard", async () => {
        const username = "AnotherUser";
        const leaderboard = getMockLeaderboard();
        ApiService.getLeaderboardByUsername.mockResolvedValue(leaderboard);

        await leaderboardStore.fetchAnotherUsersLeaderboard(username);

        expect(ApiService.getLeaderboardByUsername).toHaveBeenCalledWith(username);
        expect(leaderboardStore.topPositions).toEqual(leaderboard.topPositions);
        expect(leaderboardStore.userContext).toEqual(leaderboard.userContext);
        expect(leaderboardStore.userPosition).toEqual(leaderboard.userPosition);
        expect(leaderboardStore.totalPositions).toEqual(leaderboard.totalPositions);

    });

});
