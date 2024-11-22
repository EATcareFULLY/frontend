import {render, screen, waitFor} from "@testing-library/react";
import { achievementsStore } from "../../stores/AchievementsStore";
import Achievements from "../../pages/Achievements";

jest.mock("../../stores/AchievementsStore", () => ({
    achievementsStore: {
        achievements: null,
        fetchAchievements: jest.fn(),
        sortAchievements: jest.fn(),
        achievementsCompletedProcentage: jest.fn(() => 50),
    },
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/AchievementCard", () => ({ name, level, description }) => (
    <div>{`AchievementCard: ${name}, ${level}, ${description}`}</div>
));
jest.mock("../../components/AchievementLockedCard", () => () => <div>AchievementLockedCard</div>);

describe("Achievements Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls fetchAchievements and sortAchievements when rendered", async () => {
        achievementsStore.achievements = null;

        render(<Achievements/>);

        expect(achievementsStore.fetchAchievements).toHaveBeenCalledTimes(1);

        await waitFor(() => {
            expect(achievementsStore.sortAchievements).toHaveBeenCalledTimes(1);
        });
    });

    it("renders loading component while achievements are null", () => {
        achievementsStore.achievements = null;

        render(<Achievements />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders achievements when data is available", () => {
        achievementsStore.achievements = [
            { achievementName: "Achievement 1", level: "BRONZE", achievementDescription: "Description 1" },
            { achievementName: "Achievement 2", level: "NONE", achievementDescription: "Description 2" },
        ];

        render(<Achievements />);

        expect(screen.getByText("Achievements")).toBeInTheDocument();
        expect(screen.getByText("AchievementCard: Achievement 1, BRONZE, Description 1")).toBeInTheDocument();
        expect(screen.getByText("AchievementLockedCard")).toBeInTheDocument();
    });

    it("renders progress bar when data is available", () => {
        achievementsStore.achievements = [
            { achievementName: "Achievement 1", level: "BRONZE", achievementDescription: "Description 1" },
            { achievementName: "Achievement 2", level: "NONE", achievementDescription: "Description 2" },
        ];

        jest.spyOn(achievementsStore, "achievementsCompletedProcentage").mockReturnValue(50);

        render(<Achievements />);

        const progressBar = screen.getByRole("progressbar");
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
        expect(progressBar).toHaveTextContent("50%");
    });


    it("renders only locked cards when all achievements are locked", () => {
        achievementsStore.achievements = [
            { achievementName: "???", level: "NONE", achievementDescription: "" },
            { achievementName: "???", level: "NONE", achievementDescription: "" },
        ];

        render(<Achievements />);

        expect(screen.getAllByText("AchievementLockedCard")).toHaveLength(2);
        expect(screen.queryByText("BRONZE")).not.toBeInTheDocument();
        expect(screen.queryByText("SILVER")).not.toBeInTheDocument();
        expect(screen.queryByText("GOLD")).not.toBeInTheDocument();
    });

    it("renders only achievements when all achievements are unlocked", () => {
        achievementsStore.achievements = [
            { achievementName: "Achievement 1", level: "BRONZE", achievementDescription: "Description 1" },
            { achievementName: "Achievement 2", level: "SILVER", achievementDescription: "Description 2" },
        ];

        render(<Achievements />);

        expect(screen.getByText("Achievements")).toBeInTheDocument();
        expect(screen.getByText("AchievementCard: Achievement 1, BRONZE, Description 1")).toBeInTheDocument();
        expect(screen.getByText("AchievementCard: Achievement 2, SILVER, Description 2")).toBeInTheDocument();
        expect(screen.queryByText("AchievementLockedCard")).not.toBeInTheDocument();
    });
});
