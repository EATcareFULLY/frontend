import { render, screen, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import ProductNotFound from "../../../components/details/ProductNotFound";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn()
}));

const mockNavigate = jest.fn();

describe("ProductNotFound Component", () => {

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the component with correct text", () => {
        render(<ProductNotFound />);

        expect(screen.getByText("Product Not Found")).toBeInTheDocument();
        expect(screen.getByText("The product you are looking for does not exist in our database.")).toBeInTheDocument();
        expect(screen.getByText("Try again with different product.")).toBeInTheDocument();
        expect(screen.getByText("Scan again")).toBeInTheDocument();
    });

    it("should navigate to '/Scan' when 'Scan again' button is clicked", () => {
        render(<ProductNotFound />);

        const button = screen.getByText("Scan again");
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/Scan");
    });
});
