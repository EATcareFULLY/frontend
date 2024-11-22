import { achievementsStore } from "../../stores/AchievementsStore";
import ApiService from "../../services/ApiService";

jest.mock("../../services/ApiService");

const getMockAchievements = () => [
    { achievementName: "Achievement 1", level: "BRONZE", achievementDescription: "Description 1" },
    { achievementName: "Achievement 2", level: "BRONZE", achievementDescription: "Description 2" },
    { achievementName: "Achievement 3", level: "SILVER", achievementDescription: "Description 3" },
    { achievementName: "Achievement 4", level: "SILVER", achievementDescription: "Description 4" },
    { achievementName: "Achievement 5", level: "GOLD", achievementDescription: "Description 5" },
    { achievementName: "Achievement 6", level: "NONE", achievementDescription: "Description 6" },
];

const getUnsortedAchievements = () => [
    { achievementName: "Achievement 6", level: "NONE", achievementDescription: "Description 6" },
    { achievementName: "Achievement 3", level: "SILVER", achievementDescription: "Description 3" },
    { achievementName: "Achievement 5", level: "GOLD", achievementDescription: "Description 5" },
    { achievementName: "Achievement 2", level: "BRONZE", achievementDescription: "Description 2" },
    { achievementName: "Achievement 1", level: "BRONZE", achievementDescription: "Description 1" },
    { achievementName: "Achievement 4", level: "SILVER", achievementDescription: "Description 4" }
];

describe("AchievementsStore", () => {
    beforeEach(() => {
        achievementsStore.setAchievements([]);
        jest.clearAllMocks();
    });

    it("should set achievements", () => {
        const achievements = getMockAchievements();
        achievementsStore.setAchievements(achievements);

        expect(achievementsStore.achievements).toEqual(achievements);
    });

    it("should fetch achievements from the API", async () => {
        ApiService.getAllAchievements.mockResolvedValue(getMockAchievements());

        await achievementsStore.fetchAchievements();

        expect(ApiService.getAllAchievements).toHaveBeenCalled();
        expect(achievementsStore.achievements).toEqual(getMockAchievements());
    });

    it("should handle API fetch failures gracefully", async () => {
        console.error = jest.fn();
        ApiService.getAllAchievements.mockRejectedValue(new Error("API Error"));

        await achievementsStore.fetchAchievements();

        expect(console.error).toHaveBeenCalledWith("Failed to fetch achievements");
        expect(achievementsStore.achievements).toEqual([]);
    });

    it("should sort achievements correctly", () => {
        achievementsStore.setAchievements(getUnsortedAchievements());

        achievementsStore.sortAchievements();

        expect(achievementsStore.achievements).toEqual(getMockAchievements());
    });

    it("should calculate achievements completed percentage correctly", () => {
        achievementsStore.setAchievements(getMockAchievements());

        const percentage = achievementsStore.achievementsCompletedProcentage();

        expect(percentage).toBe(50);
    });

    it("should return 0% if there are no achievements", () => {
        achievementsStore.setAchievements([]);

        const percentage = achievementsStore.achievementsCompletedProcentage();

        expect(percentage).toBe(0);
    });
});
