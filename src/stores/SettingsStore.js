import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class SettingsStore {
    thresholds = null;
    preferences = [];

    constructor() {
        makeAutoObservable(this);
    }

    setSettings(thresholds, preferences) {
        this.thresholds = thresholds;
        this.preferences = preferences;
    }

}

export const settingsStore = new SettingsStore();
