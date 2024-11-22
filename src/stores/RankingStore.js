import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class RankingStore {
    topContext = [];
    userContext = [];

    constructor() {
        makeAutoObservable(this);
    }

    setRanking(topContext, userContext) {
        this.topContext = topContext;
        this.userContext = userContext;
    }

}

export const rankingStore = new RankingStore();
