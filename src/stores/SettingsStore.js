import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class SettingsStore {
    thresholds = null;
    preferences= [
        {
            "name": "Milk",
            "wanted": 0
        },
        {
            "name": "Eggs",
            "wanted": 0
        },
        {
            "name": "Nuts",
            "wanted": 0
        },
        {
            "name": "Vegetarian",
            "wanted": 0
        },
        {
            "name": "Organic",
            "wanted": 0
        }
    ]

    constructor() {
        makeAutoObservable(this);
    }

    setSettings(thresholds, preferences) {
        this.thresholds = thresholds;
        this.setPreferences(preferences);
    }

    setPreferences(preferences) {
        if (!Array.isArray(preferences)) {
            return;
        }

        preferences.forEach(({ name, wanted }) => {
            this.updatePreference(name, wanted);
        });
    }

    updatePreference(name, wanted) {
        this.preferences = this.preferences.map(pref =>
            pref.name === name ? { ...pref, wanted } : pref
        );
    }

    async fetchSettings() {
        try {
            const settings = await ApiService.getSettings();
            console.log("Settings store", settings);
            this.setSettings(settings.thresholds, settings.preferences);
            console.log("thres", settingsStore.thresholds);
            console.log("pref", settingsStore.preferences);
        } catch (error) {
            console.error("Failed to fetch settings");
        }
    }

    async updateSettings() {
        try {
            const response1 = await ApiService.updateSettings(this.thresholds, this.preferences);
            console.log("Settings POST response 1", response1);
            const response2 = await ApiService.getSettings();
            console.log("Settings GET response 2", response2);
        } catch (error) {
            console.error("Failed to save settings");
        }
    }


    /*
    async createPref() {
        const prefs = ApiService.createPref();

        console.log("Prefs created", prefs);
    }


    async checkPref() {
        const prefs = ApiService.checkPref();

        console.log("Prefs existing", prefs);
    }


    async setupSetting() {
        const response = ApiService.setupSettings();
        console.log("setup response", response);
    }

     */

}

export const settingsStore = new SettingsStore();
