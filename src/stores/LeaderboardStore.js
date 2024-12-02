import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class LeaderboardStore {
    topPositions = [];
    userContext = [];

    constructor() {
        makeAutoObservable(this);
    }

    setLeaderboard(topPositions, userContext) {
        this.topPositions = topPositions;
        this.userContext = userContext;

        console.log("leaderboardStore", topPositions);
    }

    async fetchUsersLeaderboard() {
        try {
            const leaderboard = await ApiService.getLeaderboard();
            this.setLeaderboard(leaderboard.topPositions, leaderboard.userContext);
        } catch (error) {
            console.error("Failed to fetch user's leaderboard");
        }
    }

    async fetchAnotherUsersLeaderboard(username) {
        try {
            const leaderboard = await ApiService.getLeaderboardByUsername(username);
            this.setLeaderboard(leaderboard.topPositions, leaderboard.userContext);
        } catch (error) {
            console.error("Failed to fetch another user's leaderboard");
        }
    }

}

export const leaderboardStore = new LeaderboardStore();
