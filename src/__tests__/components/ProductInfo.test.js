import { render, screen, fireEvent } from "@testing-library/react";
import ProductInfo from "../../components/ProductInfo";
import { scanStore } from "../../stores/ScanStore";
import nutri_a from '../../assets/nutri-score-a.png';
import img_placeholder from '../../assets/product-photo-placeholder.png';

jest.mock("../../stores/ScanStore", () => ({
    scanStore: {
        addScannedProductToPurchase: jest.fn()
    }
}));


const mockProps = {
    imageURL: "",
    id: "123456",
    name: "Test Product",
    brand: "Test Brand",
    score: "a"
};

describe("ProductInfo Component", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders product information correctly", () => {
        render(<ProductInfo {...mockProps} />);

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Brands: Test Brand")).toBeInTheDocument();
        expect(screen.getByText("Barcode: 123456")).toBeInTheDocument();
        expect(screen.getByAltText("nutri-score")).toHaveAttribute("src", nutri_a);
    });

    it("displays placeholder image if no imageURL is provided", () => {
        render(<ProductInfo {...mockProps} imageURL="" />);

        expect(screen.getByAltText("Product")).toHaveAttribute("src", img_placeholder);
    });

    it("updates quantity input value when incremented", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");
        expect(input).toHaveValue(1);

        const incrementButton = screen.getByTestId("increment-button");
        fireEvent.click(incrementButton);

        expect(input).toHaveValue(2);
    });

    it("updates quantity input value when decremented", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");
        const incrementButton = screen.getByTestId("increment-button");
        const decrementButton = screen.getByTestId("decrement-button");

        fireEvent.click(incrementButton);
        expect(input).toHaveValue(2);

        fireEvent.click(decrementButton);
        expect(input).toHaveValue(1);
    });

    it("does not decrement quantity below 1", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");
        const decrementButton = screen.getByTestId("decrement-button");

        expect(input).toHaveValue(1);

        fireEvent.click(decrementButton);

        expect(input).toHaveValue(1);
    });

    it("does not increment quantity over 9999", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");
        const incrementButton = screen.getByTestId("increment-button");

        fireEvent.change(input, { target: { value: "9999" } });

        expect(input).toHaveValue(9999);

        fireEvent.click(incrementButton);

        expect(input).toHaveValue(9999);
    });

    it("calls scanStore.addScannedProductToPurchase with correct quantity when button is clicked", async () => {
        render(<ProductInfo {...mockProps} />);

        const addButton = screen.getByRole("button", { name: /add to purchased products/i });
        fireEvent.click(addButton);

        expect(scanStore.addScannedProductToPurchase).toHaveBeenCalledWith(1);
    });

    it("updates quantity value on manual input change", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");

        fireEvent.change(input, { target: { value: "3" } });

        expect(input).toHaveValue(3);
    });

    it("does not updates quantity value on manual input chage over 9999", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");

        fireEvent.change(input, { target: { value: "99999" } });

        expect(input).toHaveValue(1);
    });

    it("does not updates quantity value on manual input chage below 1", () => {
        render(<ProductInfo {...mockProps} />);

        const input = screen.getByPlaceholderText("Quantity");

        fireEvent.change(input, { target: { value: "0" } });

        expect(input).toHaveValue(1);
    });
});