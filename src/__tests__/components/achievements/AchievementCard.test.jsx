import { render, screen } from "@testing-library/react";
import AchievementCard from "../../../components/achievements/AchievementCard";
import { achievementBadgePath } from "../../../utils/ImagePaths";

const mockProps = {
    name: "Test Achievement",
    level: "BRONZE",
    description: "This is a test description.",
};

jest.mock("../../../utils/ImagePaths", () => ({
    achievementBadgePath: jest.fn(() => "mocked-badge-path.svg"),
}));

describe("AchievementCard Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        render(<AchievementCard {...mockProps} />);
    });

    it("renders the achievement details correctly", () => {
        expect(screen.getByText(mockProps.name)).toBeInTheDocument();
        expect(screen.getByText(mockProps.level)).toBeInTheDocument();
        expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    });

    it("calls the achievementBadgePath utility with correct arguments", () => {
        expect(achievementBadgePath).toHaveBeenCalledTimes(1);
        expect(achievementBadgePath).toHaveBeenCalledWith(mockProps.name, mockProps.level);
    });

    it("renders the image with the correct alt attribute", () => {

        const imgElement = screen.getByRole("img", { name: `${mockProps.name} - ${mockProps.level}` });
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("alt", `${mockProps.name} - ${mockProps.level}`);
    });
});
