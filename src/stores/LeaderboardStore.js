import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class LeaderboardStore {
    topPositions = [];
    userContext = [];
    userPosition = null;
    totalPositions = null;

    constructor() {
        makeAutoObservable(this);
    }

    setLeaderboard(topPositions, userContext, userPosition, totalPositions) {
        this.topPositions = topPositions;
        this.userContext = userContext;
        this.userPosition = userPosition;
        this.totalPositions= totalPositions;

        console.log("leaderboardStore", topPositions);
    }

    async fetchUsersLeaderboard() {
        try {
            const leaderboard = await ApiService.getLeaderboard();
            console.log("leaderboard", leaderboard);
            this.setLeaderboard(leaderboard.topPositions, leaderboard.userContext, leaderboard.userPosition, leaderboard.totalPositions);
        } catch (error) {
            console.error("Failed to fetch user's leaderboard");
        }
    }

    async fetchAnotherUsersLeaderboard(username) {
        try {
            const leaderboard = await ApiService.getLeaderboardByUsername(username);
            this.setLeaderboard(leaderboard.topPositions, leaderboard.userContext, leaderboard.userPosition, leaderboard.totalPositions);
            console.log("leaderboard", leaderboard);
        } catch (error) {
            console.error("Failed to fetch another user's leaderboard");
            throw error;
        }
    }

}

export const leaderboardStore = new LeaderboardStore();
