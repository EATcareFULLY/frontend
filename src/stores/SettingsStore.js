import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import {successToast} from "../utils/Toasts";

class SettingsStore {
    thresholds = {
        Calories: 0,
        Protein: 0,
        Fat: 0,
        Carbohydrates: 0
    };
    preferences = {
        Milk: 0,
        Eggs: 0,
        Nuts: 0,
        Vegetarian: 0,
        Organic: 0,
    };

    backendToFrontendThresholds = {
        caloriesThreshold: "Calories",
        proteinThreshold: "Protein",
        fatThreshold: "Fat",
        carbohydratesThreshold: "Carbohydrates",
    };


    frontendToBackendThresholds = Object.entries(this.backendToFrontendThresholds).reduce(
        (acc, [backend, frontend]) => ({ ...acc, [frontend]: backend }),
        {}
    );

    constructor() {
        makeAutoObservable(this);
    }

    setSettings(thresholds, preferences) {
        this.setThresholds(thresholds);
        this.setPreferences(preferences);
    }

    setThresholds(thresholds) {

        Object.entries(thresholds).forEach(([backendKey, value]) => {
            const frontendKey = this.backendToFrontendThresholds[backendKey];
            if (frontendKey) {
                this.thresholds[frontendKey] = value;
            }
        });
    }

    setPreferences(preferences) {
        if (!Array.isArray(preferences)) {
            return;
        }

        preferences.forEach(({ name, wanted }) => {
            this.updatePreference(name, wanted)
        });
    }

    getThreshold(name) {
        if (this.thresholds.hasOwnProperty(name)) {
            return this.thresholds[name];
        }
        return null;
    }

    getPreferences(name) {
        if (this.preferences.hasOwnProperty(name)) {
            return this.preferences[name];
        }
        return null;
    }

    updateThreshold(name, value) {
        if (this.thresholds.hasOwnProperty(name)) {
            this.thresholds[name] = value;
        }
    }

    updatePreference(name, wanted) {
        if (this.preferences.hasOwnProperty(name)) {
            this.preferences[name] = wanted;
        }
    }

    async fetchSettings() {
        try {
            const settings = await ApiService.getSettings();
            console.log("Fetched settings:", settings);
            this.setSettings(settings.thresholds, settings.preferences);
            console.log("Thresholds:", this.thresholds);
            console.log("Preferences:", this.preferences);
        } catch (error) {
            console.error("Failed to fetch settings:", error);
        }
    }

    async updateSettings() {
        try {
            const response = await ApiService.updateSettings(
                this.dictionaryThresholdsToObject(),
                this.dictionaryPreferencesToList()
            );
            console.log("Settings POST response 1", response);

            successToast("Settings saved successfully.");

        } catch (error) {
            console.error("Failed to save settings:", error);
        }
    }

    dictionaryThresholdsToObject() {
        return Object.entries(this.thresholds).reduce((acc, [frontendKey, value]) => {
            const backendKey = this.frontendToBackendThresholds[frontendKey];
            if (backendKey) {
                acc[backendKey] = value;
            }
            return acc;
        }, {});
    }

    dictionaryPreferencesToList() {
        return Object.entries(this.preferences).map(([name, wanted]) => ({ name, wanted }));
    }

    getDynamicRangeForNutrient(nutrient) {
        if(nutrient==="Calories") return [500, 5000];

        const calories = this.getThreshold("Calories");

        if (calories===0) {
            return [0, 0];
        }

        const percentageRanges = {
            Protein: [5, 40],
            Fat: [15, 40],
            Carbohydrates: [40, 70],
        };

        const caloriesPerGram = {
            Protein: 4,
            Fat: 9,
            Carbohydrates: 4,
        };

        const [minPercent, maxPercent] = percentageRanges[nutrient];
        const caloriePerGram = caloriesPerGram[nutrient];

        const minGrams = Math.round((minPercent / 100) * calories / caloriePerGram);
        const maxGrams = Math.round((maxPercent / 100) * calories / caloriePerGram);

        return [minGrams, maxGrams];
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


