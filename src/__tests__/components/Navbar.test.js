import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { ConnectionContext } from "../../utils/ConnectionContext";
import MainNavBar from "../../components/Navbar";

jest.mock("@react-keycloak/web", () => ({
    useKeycloak: jest.fn(),
}));

const mockKeycloak = {
    tokenParsed: { preferred_username: "testuser" },
    authenticated: true,
    logout: jest.fn(),
};

const mockConnectionContext = (connected) => ({
    connected,
});

const renderComponent = (connected = true) =>
    render(
        <Router>
            <ConnectionContext.Provider value={mockConnectionContext(connected)}>
                <MainNavBar />
            </ConnectionContext.Provider>
        </Router>
    );

const setWindowWidth = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
};

describe("Navbar Component", () => {
    beforeEach(() => {
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak, initialized: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the logo and links when user is authenticated", () => {
        renderComponent();

        expect(screen.getByAltText("EATcareFULLY")).toBeInTheDocument();
        expect(screen.getByText("Scan")).toBeInTheDocument();
        expect(screen.getByText("Label")).toBeInTheDocument();
        expect(screen.getByText("History")).toBeInTheDocument();
        expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    });

    it("displays 'OFFLINE' badge when the app is offline", () => {
        renderComponent(false);

        expect(screen.getByText("OFFLINE")).toBeInTheDocument();
    });

    it("does not display 'OFFLINE' badge when the app is online", () => {
        renderComponent(true);

        expect(screen.queryByText("OFFLINE")).not.toBeInTheDocument();
    });

    it("renders dropdown with logout and settings options", () => {
        renderComponent();

        fireEvent.click(screen.getByText("Logged in as: testuser"));

        expect(screen.getByText("Logout")).toBeInTheDocument();
        expect(screen.getByText("Achievements")).toBeInTheDocument();
        expect(screen.getByText("Settings")).toBeInTheDocument();
    });

    it("calls Keycloak logout with redirect URI on logout click", () => {
        renderComponent();

        fireEvent.click(screen.getByText("Logged in as: testuser"));
        fireEvent.click(screen.getByText("Logout"));

        expect(mockKeycloak.logout).toHaveBeenCalledWith({ redirectUri: "http://localhost:3000/" });
    });

    it("toggles the navbar expansion state when the toggle button is clicked", async () => {
        setWindowWidth(300);
        renderComponent();

        const toggleButton = screen.getByLabelText("Toggle navigation");
        const navbarCollapse = screen.getByTestId("responsive-navbar-nav");

        expect(navbarCollapse).not.toHaveClass("show");

        fireEvent.click(toggleButton);
        await waitFor(() => expect(navbarCollapse).toHaveClass("show"));

        fireEvent.click(toggleButton);
        await waitFor(() => expect(navbarCollapse).not.toHaveClass("show"));
    });

    it("closes the navbar when a link is clicked", async () => {
        setWindowWidth(300);
        renderComponent();

        const toggleButton = screen.getByLabelText("Toggle navigation");
        const navbarCollapse = screen.getByTestId("responsive-navbar-nav");

        fireEvent.click(toggleButton);
        await waitFor(() => expect(navbarCollapse).toHaveClass("show"));

        const scanLink = screen.getByText("Scan");
        fireEvent.click(scanLink);

        await waitFor(() => expect(navbarCollapse).not.toHaveClass("show"));
    });

    it("does not render navbar if Keycloak is not initialized", () => {
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak, initialized: false });
        renderComponent();

        expect(screen.queryByAltText("EATcareFULLY")).not.toBeInTheDocument();
    });

    it("does not render navbar when user is not authenticated", () => {
        useKeycloak.mockReturnValue({ keycloak: { authenticated: false }, initialized: true });
        renderComponent();

        expect(screen.queryByAltText("EATcareFULLY")).not.toBeInTheDocument();
    });
});