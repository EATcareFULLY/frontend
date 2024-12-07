import { render, screen } from "@testing-library/react";
import NotAvailableInOfflineMode from "../../components/NotAvailableInOfflineMode";

describe("NotAvailableInOfflineMode Component", () => {
    it("should render the component with correct heading", () => {
        render(<NotAvailableInOfflineMode />);

        expect(screen.getByText("Not Available")).toBeInTheDocument();
    });

    it("should render the correct messages", () => {
        render(<NotAvailableInOfflineMode />);

        expect(
            screen.getByText(
                "To use this feature, please connect the application to the internet."
            )
        ).toBeInTheDocument();
        expect(screen.getByText("Reconnect and try again.")).toBeInTheDocument();
    });
});