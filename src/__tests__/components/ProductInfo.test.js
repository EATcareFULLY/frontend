import { render, screen, fireEvent } from "@testing-library/react";
import ProductInfo from "../../components/ProductInfo";
import { scanStore } from "../../stores/ScanStore";
import nutri_a from '../../assets/nutri-score-a.svg';
import img_placeholder from '../../assets/product-photo-placeholder.svg';

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
    let input;
    let decrementButton;
    let incrementButton;

    beforeEach(() => {
        jest.clearAllMocks();

        render(<ProductInfo {...mockProps} />);

        incrementButton = screen.getByTestId("increment-button");
        decrementButton = screen.getByTestId("decrement-button");
        input = screen.getByTestId("quantity-input");
    });

    it("renders product information correctly", () => {

        expect(screen.getByText("Test Product")).toBeInTheDocument();
        expect(screen.getByText("Brands: Test Brand")).toBeInTheDocument();
        expect(screen.getByText("Barcode: 123456")).toBeInTheDocument();
        expect(screen.getByAltText("nutri-score")).toHaveAttribute("src", nutri_a);
    });

    it("displays placeholder image if no imageURL is provided", () => {

        expect(screen.getByAltText("Product-photo")).toHaveAttribute("src", img_placeholder);
    });

    it("updates quantity input value when incremented", () => {

        expect(input).toHaveValue(1);

        fireEvent.click(incrementButton);

        expect(input).toHaveValue(2);
    });

    it("updates quantity input value when decremented", () => {

        fireEvent.click(incrementButton);
        expect(input).toHaveValue(2);

        fireEvent.click(decrementButton);
        expect(input).toHaveValue(1);
    });

    it("does not decrement quantity below 1", () => {

        expect(input).toHaveValue(1);

        fireEvent.click(decrementButton);

        expect(input).toHaveValue(1);
    });

    it("does not increment quantity over 9999", () => {

        fireEvent.change(input, { target: { value: "9999" } });

        expect(input).toHaveValue(9999);

        fireEvent.click(incrementButton);

        expect(input).toHaveValue(9999);
    });

    it("calls scanStore.addScannedProductToPurchase with correct quantity when button is clicked", async () => {

        const addButton = screen.getByRole("button", { name: /add to purchased products/i });
        fireEvent.click(addButton);

        expect(scanStore.addScannedProductToPurchase).toHaveBeenCalledWith(1);
    });

    it("updates quantity value on manual input change", () => {

        fireEvent.change(input, { target: { value: "3" } });

        expect(input).toHaveValue(3);
    });

    it("does not updates quantity value on manual input chage over 9999", () => {

        fireEvent.change(input, { target: { value: "99999" } });

        expect(input).toHaveValue(1);
    });

    it("does not updates quantity value on manual input chage below 1", () => {

        fireEvent.change(input, { target: { value: "0" } });

        expect(input).toHaveValue(1);
    });
});