import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Settings from "../../pages/Settings";
import { settingsStore } from "../../stores/SettingsStore";
import userEvent from "@testing-library/user-event";

jest.mock("../../stores/SettingsStore", () => ({
    settingsStore: {
        thresholds: {},
        preferences: {},
        getDynamicRangeForNutrient: jest.fn(),
        fetchSettings: jest.fn(),
        updateThreshold: jest.fn(),
        updatePreference: jest.fn(),
        updateSettings: jest.fn(),
        getThreshold: jest.fn(),
    },
}));

jest.mock("../../components/layout/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/settings/SettingsWrapper", () => ({ children }) => (
    <div>{children}</div>
));
jest.mock("../../components/settings/SettingPreference", () => ({ name }) => (
    <div>{`Preference: ${name}`}</div>
));
jest.mock("../../components/settings/SettingThreshold", () => ({ name }) => (
    <div>{`Threshold: ${name}`}</div>
));

describe("Settings Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockThresholds = {
        Calories: 2000,
        Protein: 50,
    };

    const mockPreferences = {
        Sugar: 1,
        Fat: -1,
    };

    it("renders the loading screen initially", async() => {
        settingsStore.getThreshold.mockReturnValue(0);

        render(<Settings />);

        expect(settingsStore.fetchSettings).toHaveBeenCalledTimes(1);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders static elements of component correctly", async () => {

        render(<Settings />);

        expect(screen.getByText("Settings")).toBeInTheDocument();
        expect(screen.getByText("Daily nutrition thresholds")).toBeInTheDocument();
        expect(screen.getByText("Recommendation preferences")).toBeInTheDocument();
        expect(screen.getByText("Revert")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    it("renders thresholds and preferences when data is available", async () => {
        settingsStore.thresholds = mockThresholds;
        settingsStore.preferences = mockPreferences;

        render(<Settings />);

        await waitFor(() => {
            expect(screen.getByText("Threshold: Calories")).toBeInTheDocument();
            expect(screen.getByText("Threshold: Protein")).toBeInTheDocument();
            expect(screen.getByText("Preference: Sugar")).toBeInTheDocument();
            expect(screen.getByText("Preference: Fat")).toBeInTheDocument();
        });
    });

    it("handles threshold updates correctly", async () => {
        settingsStore.thresholds = mockThresholds;

        render(<Settings />);

        await waitFor(() => {
            expect(screen.getByText("Threshold: Calories")).toBeInTheDocument();
        });

        const thresholdName = "Calories";
        const newValue = 1800;

        settingsStore.updateThreshold(thresholdName, newValue);

        expect(settingsStore.updateThreshold).toHaveBeenCalledWith(thresholdName, newValue);
    });

    it("handles preference updates correctly", async () => {
        settingsStore.preferences = mockPreferences;

        render(<Settings />);

        await waitFor(() => {
            expect(screen.getByText("Preference: Sugar")).toBeInTheDocument();
        });

        const preferenceName = "Sugar";
        const newValue = 0;

        settingsStore.updatePreference(preferenceName, newValue);

        expect(settingsStore.updatePreference).toHaveBeenCalledWith(preferenceName, newValue);
    });

    it("calls save when clicking the Save button", async () => {
        render(<Settings />);

        const saveButton = screen.getByText("Save");
        fireEvent.click(saveButton);

        expect(settingsStore.updateSettings).toHaveBeenCalledTimes(1);
    });

    it("calls revert when clicking the Revert button", async () => {
        render(<Settings />);

        const revertButton = screen.getByText("Revert");
        fireEvent.click(revertButton);

        expect(settingsStore.fetchSettings).toHaveBeenCalledTimes(2);
    });

    it("displays tooltip content when hovering over the info icon", async () => {
        render(<Settings />);

        const infoIcon = screen.getByTestId("info-tooltip-icon");
        expect(infoIcon).toBeInTheDocument();

        userEvent.hover(infoIcon);

        await waitFor(() => {
            expect(
                screen.getByText(/Minimum and maximum thresholds are set based on dietary guidelines/i)
            ).toBeInTheDocument();
        });

        userEvent.unhover(infoIcon);

        await waitFor(() => {
            expect(
                screen.queryByText(/Minimum and maximum thresholds are set based on dietary guidelines/i)
            ).not.toBeInTheDocument();
        });
    });
});
