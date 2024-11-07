import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import MainNavBar from "../../components/Navbar";

jest.mock("@react-keycloak/web", () => ({
    useKeycloak: jest.fn()
}));

const mockKeycloak = {
    tokenParsed: { preferred_username: "testuser" },
    authenticated: true,
    logout: jest.fn()
};

const renderComponent = () =>
    render(
        <Router>
            <MainNavBar />
        </Router>
    );

const setWindowWidth = (width) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
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
        expect(screen.getByText("History")).toBeInTheDocument();
        expect(screen.getByText("Analyze")).toBeInTheDocument();
    });

    it("displays the username in the dropdown when authenticated", () => {
        renderComponent();

        const dropdown = screen.getByText("Logged in as: testuser");
        expect(dropdown).toBeInTheDocument();
    });

    it("does not render navbar if Keycloak is not initialized", () => {
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak, initialized: false });
        renderComponent();

        expect(screen.queryByAltText("EATcareFULLY")).not.toBeInTheDocument();
    });

    it("does not render navbar when user is not authenticated", () => {
        useKeycloak.mockReturnValue({ keycloak: {authenticated: false}, initialized: false });
        renderComponent();

        expect(screen.queryByAltText("EATcareFULLY")).not.toBeInTheDocument();
    });

    it("calls Keycloak logout with redirect URI on logout click", () => {
        renderComponent();

        fireEvent.click(screen.getByText("Logged in as: testuser"));
        fireEvent.click(screen.getByText("Logout"));

        expect(mockKeycloak.logout).toHaveBeenCalledWith({ redirectUri: "http://localhost:3000/" });
    });

    it("toggles the navbar expansion state when the toggle button is clicked on small screens", async () => {
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
});
