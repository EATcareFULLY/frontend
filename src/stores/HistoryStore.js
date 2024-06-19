import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class HistoryStore {
    history = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllPurchases() {
        try {
            const products = await ApiService.getTestPurchases();
            this.setHistory(products);
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        }
    }

    setHistory(products) {
        this.history = products;
    }
}

export const historyStore = new HistoryStore();
