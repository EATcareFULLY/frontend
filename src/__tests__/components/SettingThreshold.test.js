import { render, screen, fireEvent } from "@testing-library/react";
import SettingThreshold from "../../components/SettingThreshold";

describe("SettingThreshold Component", () => {
    const mockOnUpdate = jest.fn();
    const defaultProps = {
        name: "Threshold",
        value: 50,
        unit: "kg",
        valueRange: [0, 100],
        onUpdate: mockOnUpdate,
    };

    beforeEach(() => {
        render(<SettingThreshold {...defaultProps} />);
    });

    it("renders correctly with initial props", () => {
        expect(screen.getByText("Threshold")).toBeInTheDocument();
        expect(screen.getByTestId('threshold-input')).toHaveValue(50);
        expect(screen.getByTestId('threshold-slider')).toHaveValue("50");
        expect(screen.getByText("kg")).toBeInTheDocument();
    });

    it("updates the value when the range is changed", () => {
        const range = screen.getByTestId('threshold-slider');
        fireEvent.change(range, { target: { value: 60 } });

        expect(mockOnUpdate).toHaveBeenCalledWith("Threshold", 60);
    });

    it("updates the value when the input is changed", () => {
        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: "75" } });

        expect(screen.getByDisplayValue(75)).toBeInTheDocument();
    });

    it("calls onUpdate with the correct value when the input loses focus", () => {
        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: "40" } });
        fireEvent.blur(input);

        expect(mockOnUpdate).toHaveBeenCalledWith("Threshold", 40);
    });

    it("does not allow values below the min range", () => {
        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: "-10" } });
        fireEvent.blur(input);

        expect(mockOnUpdate).toHaveBeenCalledWith("Threshold", 0);
    });

    it("does not allow values over the max range", () => {
        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: "110" } });
        fireEvent.blur(input);

        expect(mockOnUpdate).toHaveBeenCalledWith("Threshold", 100);
    });

    it("sets value to min range if it is NaN", () => {
        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: "abc" } });
        fireEvent.blur(input);

        expect(mockOnUpdate).toHaveBeenCalledWith("Threshold", 0);
    });
});
