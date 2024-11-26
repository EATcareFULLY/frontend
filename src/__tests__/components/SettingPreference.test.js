import { render, screen, fireEvent } from "@testing-library/react";
import SettingPreference from "../../components/SettingPreference"; // Adjust path if needed

jest.mock("../../stores/SettingsStore", () => ({
    settingsStore: {
        updatePreference: jest.fn()
    }
}));

const mockUpdate = jest.fn();

const mockPropsDefault = {
    name: "Test Preference",
    wanted: 0,
    onUpdate: mockUpdate
};

const mockPropsRecommend = {
    name: "Test Preference",
    wanted: 1,
    onUpdate: mockUpdate
};

describe("SettingPreference Component", () => {


    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders buttons with correct labels and default selection", () => {
        render(<SettingPreference {...mockPropsDefault} />);

        expect(screen.getByText("Test Preference")).toBeInTheDocument();

        expect(screen.getByText("Avoid")).toBeInTheDocument();
        expect(screen.getByText("Neutral")).toBeInTheDocument();
        expect(screen.getByText("Recommend")).toBeInTheDocument();

        const neutralButton = screen.getByLabelText("Neutral");
        expect(neutralButton).toBeChecked();
    });

    it("updates the preference value when component is rerendered", () => {
        render(<SettingPreference {...mockPropsRecommend} />);

        const avoidButton = screen.getByLabelText("Avoid");
        const neutralButton = screen.getByLabelText("Neutral");
        const recommendButton = screen.getByLabelText("Recommend");

        expect(avoidButton).not.toBeChecked();
        expect(neutralButton).not.toBeChecked();
        expect(recommendButton).toBeChecked();

    });


    it("calls onUpdate when any button is clicked", () => {
        render(<SettingPreference {...mockPropsDefault} />);

        const avoidButton = screen.getByLabelText("Avoid");
        fireEvent.click(avoidButton);

        expect(mockUpdate).toHaveBeenCalledWith("Test Preference", -1);
    });
});
