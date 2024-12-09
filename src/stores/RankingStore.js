import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class RankingStore {
    topPositions = [];
    userContext = [];

    constructor() {
        makeAutoObservable(this);
    }

    setRanking(topPositions, userContext) {
        this.topPositions = topPositions;
        this.userContext = userContext;
    }

    async fetchRanking() {
        try {
            const ranking = await ApiService.getRanking();
            this.setAchievements(ranking.topPositions, ranking.userContext);
        } catch (error) {
            console.error("Failed to fetch ranking");
        }
    }

}

export const rankingStore = new RankingStore();
