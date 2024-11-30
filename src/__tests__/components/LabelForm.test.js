import { render, screen, fireEvent } from "@testing-library/react";
import LabelForm from "../../components/LabelForm";
import {errorToast} from "../../utils/Toasts";

const mockLabelSubmission = jest.fn();

jest.mock("../../utils/Toasts", () => ({
    errorToast: jest.fn(),
}));

describe("LabelForm Component", () => {

    beforeEach(() => {
        render(<LabelForm labelSubmition={mockLabelSubmission} />);
    });

    it("should render the component correctly", () => {
        const inputElement = screen.getByPlaceholderText("Enter label");
        const buttonElement = screen.getByText("Submit");

        expect(inputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });

    it("should update input value when typing", () => {
        const inputElement = screen.getByPlaceholderText("Enter label");

        fireEvent.change(inputElement, { target: { value: "Test label" } });

        expect(inputElement.value).toBe("Test label");
    });

    it("should call labelSubmition when submit button is clicked and label is valid", () => {
        const inputElement = screen.getByPlaceholderText("Enter label");
        const buttonElement = screen.getByText("Submit");

        fireEvent.change(inputElement, { target: { value: "Valid label" } });
        fireEvent.click(buttonElement);

        expect(mockLabelSubmission).toHaveBeenCalledTimes(1);
        expect(mockLabelSubmission).toHaveBeenCalledWith();
    });

    it("should not call labelSubmition when input label is invalid", () => {
        const inputElement = screen.getByPlaceholderText("Enter label");
        const buttonElement = screen.getByText("Submit");

        fireEvent.change(inputElement, { target: { value: "Invalid label`<>" } });
        fireEvent.click(buttonElement);

        expect(mockLabelSubmission).not.toHaveBeenCalled();
        expect(errorToast).toHaveBeenCalledWith("Invalid label format.");
    });

    it("should not call labelSubmition when input label is empty", () => {
        const inputElement = screen.getByPlaceholderText("Enter label");
        const buttonElement = screen.getByText("Submit");

        fireEvent.change(inputElement, { target: { value: "" } });
        fireEvent.click(buttonElement);

        expect(mockLabelSubmission).not.toHaveBeenCalled();
        expect(errorToast).toHaveBeenCalledWith("Invalid label format.");
    });

});
