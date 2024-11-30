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
    }

    async fetchLeaderboard() {
        try {
            const leaderboard = await ApiService.getRanking();
            this.setLeaderboard(leaderboard.topPositions, leaderboard.userContext);
        } catch (error) {
            console.error("Failed to fetch ranking");
        }
    }

}

export const leaderboardStore = new LeaderboardStore();
