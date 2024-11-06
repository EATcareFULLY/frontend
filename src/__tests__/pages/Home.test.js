import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Home from "../../pages/Home";
import { errorToast } from "../utils/Toasts";

jest.mock("@react-keycloak/web", () => ({
    useKeycloak: jest.fn(),
}));

jest.mock("../utils/Toasts", () => ({
    errorToast: jest.fn(),
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/HomeCard", () => ({ title, body }) => (
    <div>
        <h1>{title}</h1>
        <p>{body}</p>
    </div>
));

const mockKeycloak = {
    authenticated: false,
    login: jest.fn(),
    tokenParsed: { preferred_username: "testuser" },
};

describe("Home Page", () => {

    beforeEach(() => {
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak, initialized: true });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading screen when Keycloak is not initialized", () => {
        useKeycloak.mockReturnValue({ keycloak: mockKeycloak, initialized: false });
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders welcome message and Get started button when user is not authenticated", () => {
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByText("Welcome to EATcareFULLY!")).toBeInTheDocument();
        expect(screen.getByText("Get started")).toBeInTheDocument();
    });

    it("calls Keycloak login when 'Get started' button is clicked and user is not authenticated", () => {

        render(
            <Router>
                <Home />
            </Router>
        );

        const getStartedButton = screen.getByText("Get started");
        fireEvent.click(getStartedButton);

        expect(mockKeycloak.login).toHaveBeenCalledWith({ redirectUri: "http://localhost:3000/" });
    });

    it("renders welcome message with username when user is authenticated", () => {
        mockKeycloak.authenticated = true;
        render(
            <Router>
                <Home />
            </Router>
        );

        expect(screen.getByText("Welcome, testuser!")).toBeInTheDocument();
    });

    it("displays a random welcome message when user is authenticated", () => {
        mockKeycloak.authenticated = true;
        render(
            <Router>
                <Home />
            </Router>
        );

        const welcomeMessages = [
            "We're glad to have you here at EATcareFULLY.",
            "Your health is in your hands. We're here to help.",
            "Take control of your health, one bite at a time.",
            "Fuel your body, nourish your mind.",
            "Eat well, live well.",
            "Empower yourself with healthy choices.",
            "Together, we can make a difference.",
        ];

        expect(screen.getByText((content) => welcomeMessages.includes(content))).toBeInTheDocument();
    });
});
