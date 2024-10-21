import {render, screen} from "@testing-library/react";
import {useKeycloak} from "@react-keycloak/web";
import {useNavigate} from "react-router-dom";
import RequireAuth from "../../components/RequireAuth";
import Loading from "../../components/Loading";

const mockRender = () => {
    render(
        <RequireAuth>
            <div>Protected Content</div>
        </RequireAuth>
    );
}

const mockNavigate = jest.fn();

jest.mock("@react-keycloak/web", () => ({
    useKeycloak: jest.fn()
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn()
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);


describe("RequireAuth Component", () => {

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    it("should show Loading component if keycloak is not initialized", () => {
        useKeycloak.mockReturnValue({ keycloak: {}, initialized: false });

        mockRender();

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });


    it("should navigate to home if user is not authenticated", () => {
        useKeycloak.mockReturnValue({ keycloak: { authenticated: false }, initialized: true });

        mockRender();

        expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
    });

    it("should render children if user is authenticated", () => {
        useKeycloak.mockReturnValue({ keycloak: { authenticated: true }, initialized: true });

        mockRender();

        expect(screen.getByText("Protected Content")).toBeInTheDocument();
    });
});