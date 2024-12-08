import {fireEvent, render, screen} from "@testing-library/react";
import PageNotFound from "../../pages/PageNotFound";
import {useNavigate} from "react-router-dom";


jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe("PageNotFound page", () => {

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
        render(<PageNotFound />);
    })

    it("should render the correct messages", () => {

        expect(screen.getByAltText("EATcareFULLY-logo")).toBeInTheDocument();
        expect(screen.getByText("Page Not Found")).toBeInTheDocument();
        expect(
            screen.getByText(
                "Sorry, the page you are looking for does not exist."
            )
        ).toBeInTheDocument();

    });


    it("navigates to / when 'Take me home' button is clicked", () => {
        const button = screen.getByTestId("home-button");
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/");
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
});