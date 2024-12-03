import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class AchievementsStore {
    achievements = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAchievements(achievements) {
        this.achievements = achievements;
    }

    async fetchAchievements() {
        try {
            const achievements = await ApiService.getAllAchievements();
            this.setAchievements(achievements);
        } catch (error) {
            console.error("Failed to fetch achievements");
        }
    }

    sortAchievements() {
        this.achievements = this.achievements.sort((a, b) => {
            if (a.level === "NONE" && b.level !== "NONE") return 1;
            if (a.level !== "NONE" && b.level === "NONE") return -1;

            const levelOrder = { BRONZE: 1, SILVER: 2, GOLD: 3 };
            if (levelOrder[a.level] !== levelOrder[b.level]) {
                return levelOrder[a.level] - levelOrder[b.level];
            }

            return a.achievementName.localeCompare(b.achievementName);
        });
    }


    achievementsCompletedProcentage() {
        const totalPossible = this.achievements.length * 3;
        let completedCount = 0;

        this.achievements.forEach((achievement) => {
            if (achievement.level === "BRONZE") {
                completedCount += 1;
            } else if (achievement.level === "SILVER") {
                completedCount += 2;
            } else if (achievement.level === "GOLD") {
                completedCount += 3;
            }
        });

        return totalPossible > 0
            ? Math.round((completedCount / totalPossible) * 100)
            : 0;
    }
}

export const achievementsStore = new AchievementsStore();
