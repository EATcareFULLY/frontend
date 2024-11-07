import { render, screen, fireEvent } from "@testing-library/react";
import BarcodeForm from "../../components/BarcodeForm";

const mockBarcodeSubmission = jest.fn();

describe("BarcodeForm Component", () => {

    beforeEach(() => {
        render(<BarcodeForm barcodeSubmition={mockBarcodeSubmission} />);
    });

    it("should render the component correctly", () => {
        const headerElement = screen.getByText("No scanner? Type here");
        const inputElement = screen.getByPlaceholderText("Enter barcode");
        const buttonElement = screen.getByText("Submit");

        expect(headerElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("should update input value when typing", () => {
        const inputElement = screen.getByPlaceholderText("Enter barcode");

        fireEvent.change(inputElement, { target: { value: "123456789" } });

        expect(inputElement.value).toBe("123456789");
    });

    it("should call barcodeSubmition when submit button is clicked", () => {
        const inputElement = screen.getByPlaceholderText("Enter barcode");
        const buttonElement = screen.getByText("Submit");

        fireEvent.change(inputElement, { target: { value: "123456789" } });
        fireEvent.click(buttonElement);

        expect(mockBarcodeSubmission).toHaveBeenCalledTimes(1);
        expect(mockBarcodeSubmission).toHaveBeenCalledWith("123456789");
    });
});
