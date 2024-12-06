import { render, screen } from "@testing-library/react";
import { ConnectionContext } from "../../utils/ConnectionContext";
import RequireConnection from "../../components/RequireConnection";

jest.mock("../../components/NotAvailableInOfflineMode", () => () => (
    <div>Not Available in Offline Mode</div>
));

const renderWithContext = (connected) => {
    render(
        <ConnectionContext.Provider value={{ connected }}>
            <RequireConnection>
                <div>Protected Content</div>
            </RequireConnection>
        </ConnectionContext.Provider>
    );
};

describe("RequireConnection Component", () => {
    it("should render the NotAvailableInOfflineMode component when not connected", () => {
        renderWithContext(false);

        expect(
            screen.getByText("Not Available in Offline Mode")
        ).toBeInTheDocument();
        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    });

    it("should render children when connected", () => {
        renderWithContext(true);

        expect(screen.getByText("Protected Content")).toBeInTheDocument();
        expect(
            screen.queryByText("Not Available in Offline Mode")
        ).not.toBeInTheDocument();
    });
});
