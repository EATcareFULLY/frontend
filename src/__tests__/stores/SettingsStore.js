import { settingsStore } from "../../stores/SettingsStore";
import ApiService from "../../services/ApiService";

jest.mock("../../services/ApiService");
jest.mock("../../utils/Toasts", () => ({
    successToast: jest.fn(),
}));

describe("SettingsStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        settingsStore.thresholds = {
            Calories: 0,
            Protein: 0,
            Fat: 0,
            Carbohydrates: 0,
        };
        settingsStore.preferences = {
            Milk: 0,
            Eggs: 0,
            Nuts: 0,
            Vegetarian: 0,
            Organic: 0,
        };
    });

    it("should set thresholds and preferences correctly", () => {
        const thresholds = {
            caloriesThreshold: 2000,
            proteinThreshold: 50,
            fatThreshold: 70,
            carbohydratesThreshold: 300,
        };
        const preferences = [
            { name: "Milk", wanted: 1 },
            { name: "Vegetarian", wanted: 1 },
        ];

        settingsStore.setSettings(thresholds, preferences);

        expect(settingsStore.thresholds).toEqual({
            Calories: 2000,
            Protein: 50,
            Fat: 70,
            Carbohydrates: 300,
        });
        expect(settingsStore.preferences).toEqual({
            Milk: 1,
            Eggs: 0,
            Nuts: 0,
            Vegetarian: 1,
            Organic: 0,
        });
    });

    it("should reset preferences correctly", () => {
        settingsStore.preferences = {
            Milk: 1,
            Eggs: 1,
            Nuts: 0,
            Vegetarian: -1,
            Organic: -1,
        };

        settingsStore.resetPreferences();

        expect(settingsStore.preferences).toEqual({
            Milk: 0,
            Eggs: 0,
            Nuts: 0,
            Vegetarian: 0,
            Organic: 0,
        })
    });

    it("should get threshold values", () => {
        settingsStore.thresholds.Calories = 2500;

        const result = settingsStore.getThreshold("Calories");

        expect(result).toBe(2500);
    });

    it("should get preference values", () => {
        settingsStore.preferences.Vegetarian = 1;

        const result = settingsStore.getPreference("Vegetarian");

        expect(result).toBe(1);
    });

    it("should update a specific threshold value", () => {
        settingsStore.updateThreshold("Protein", 60);

        expect(settingsStore.thresholds.Protein).toBe(60);
    });

    it("should validate thresholds after Calories update", () => {
        settingsStore.thresholds = {
            Calories: 5000,
            Protein: 500,
            Fat: 222,
            Carbohydrates: 875,
        };

        settingsStore.updateThreshold("Calories", 500);

        expect(settingsStore.thresholds.Protein).toBe(50);
        expect(settingsStore.thresholds.Fat).toBe(22);
        expect(settingsStore.thresholds.Carbohydrates).toBe(88);
    });

    it("should update a specific preference value", () => {
        settingsStore.updatePreference("Nuts", 1);

        expect(settingsStore.preferences.Nuts).toBe(1);
    });

    it("should fetch settings from the backend", async () => {
        const mockSettings = {
            thresholds: {
                caloriesThreshold: 2000,
                proteinThreshold: 50,
                fatThreshold: 70,
                carbohydratesThreshold: 300,
            },
            preferences: [
                { name: "Milk", wanted: 1 },
                { name: "Vegetarian", wanted: 1 },
            ],
        };

        ApiService.getSettings.mockResolvedValue(mockSettings);

        await settingsStore.fetchSettings();

        expect(settingsStore.thresholds).toEqual({
            Calories: 2000,
            Protein: 50,
            Fat: 70,
            Carbohydrates: 300,
        });
        expect(settingsStore.preferences).toEqual({
            Milk: 1,
            Eggs: 0,
            Nuts: 0,
            Vegetarian: 1,
            Organic: 0,
        });
    });

    it("should handle failed settings fetch", async () => {
        ApiService.getSettings.mockRejectedValue(new Error("Fetch failed"));

        await settingsStore.fetchSettings();

        expect(settingsStore.thresholds).toEqual({
            Calories: 0,
            Protein: 0,
            Fat: 0,
            Carbohydrates: 0,
        });
    });

    it("should update settings on the backend with data changed to proper format", async () => {
        const spyUpdateSettings = jest.spyOn(ApiService, "updateSettings").mockResolvedValue();

        settingsStore.thresholds.Calories = 2500;
        settingsStore.preferences.Vegetarian = 1;

        await settingsStore.updateSettings();

        expect(spyUpdateSettings).toHaveBeenCalledWith(
            {
                caloriesThreshold: 2500,
                proteinThreshold: 0,
                fatThreshold: 0,
                carbohydratesThreshold: 0,
            },
            [
                { name: "Milk", wanted: 0 },
                { name: "Eggs", wanted: 0 },
                { name: "Nuts", wanted: 0 },
                { name: "Vegetarian", wanted: 1 },
                { name: "Organic", wanted: 0 },
            ]
        );
    });

    it("should calculate dynamic range for a nutrient", () => {
        settingsStore.updateThreshold("Calories", 2000);

        const [minProtein, maxProtein] = settingsStore.getDynamicRangeForNutrient("Protein");

        expect(minProtein).toBe(25); // 5% of 2000 calories / 4 cal per gram
        expect(maxProtein).toBe(200); // 40% of 2000 calories / 4 cal per gram
    });

    it("should return proper range for Calories", () => {

        const [minProtein, maxProtein] = settingsStore.getDynamicRangeForNutrient("Calories");

        expect(minProtein).toBe(500);
        expect(maxProtein).toBe(5000);
    });
});
