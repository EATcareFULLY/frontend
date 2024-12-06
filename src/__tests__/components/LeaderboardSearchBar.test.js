import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeaderboardSearchBar from "../../components/LeaderboardSearchBar";
import { errorToast } from "../../utils/Toasts";

jest.mock("../../utils/Toasts", () => ({
    errorToast: jest.fn(),
}));

describe("LeaderboardSearchBar Component", () => {
    const initialUsername = "JohnDoe";
    const mockOnSearch = jest.fn();
    const mockOnReset = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the input field and search button", () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset} />);

        expect(screen.getByPlaceholderText("Search for a username...")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should show an error toast when an invalid username is entered", async () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset} />);

        fireEvent.change(screen.getByPlaceholderText("Search for a username..."), { target: { value: "Invalid Username" } });

        fireEvent.click(screen.getByRole("button"));

        expect(errorToast).toHaveBeenCalledWith("Invalid username format.");
        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it("should show an error toast when an empty username is entered", async () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset} />);

        fireEvent.change(screen.getByPlaceholderText("Search for a username..."), { target: { value: "" } });

        fireEvent.click(screen.getByRole("button"));

        expect(errorToast).toHaveBeenCalledWith("Invalid username format.");
        expect(mockOnSearch).not.toHaveBeenCalled();
    });

    it("should handle search correctly when a valid username is entered", async () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset} />);

        fireEvent.change(screen.getByPlaceholderText("Search for a username..."), { target: { value: "JaneDoe" } });

        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => expect(mockOnSearch).toHaveBeenCalledWith("JaneDoe"));

        expect(mockOnSearch).toHaveBeenCalledTimes(1);

    });

    it("should reset the search when the reset button is clicked", async () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset} />);

        fireEvent.change(screen.getByPlaceholderText("Search for a username..."), { target: { value: "JaneDoe" } });
        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Leaderboard displayed for:")).toBeInTheDocument();
            expect(screen.getByText("JaneDoe")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("resetButton"));

        expect(mockOnReset).toHaveBeenCalledTimes(1);

        expect(screen.queryByText("Leaderboard displayed for:")).not.toBeInTheDocument();
        expect(screen.queryByText("JaneDoe")).not.toBeInTheDocument();
    });

    it("should display the correct username when the current username differs from the initial username", async () => {
        render(<LeaderboardSearchBar initialUsername={initialUsername} onSearch={mockOnSearch} onReset={mockOnReset}/>);

        fireEvent.change(screen.getByPlaceholderText("Search for a username..."), {target: {value: "JaneDoe"}});

        fireEvent.click(screen.getByRole("button"));

        await waitFor(() => {
            expect(screen.getByText("Leaderboard displayed for:")).toBeInTheDocument();
            expect(screen.getByText("JaneDoe")).toBeInTheDocument();
        });
    });
});
