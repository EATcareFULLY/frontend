import { render, screen, fireEvent } from "@testing-library/react";
import ProductInfo from "../../components/ProductInfo";
import { scanStore } from "../../stores/ScanStore";
import { achievementToast } from "../../utils/Toasts";
import nutri_a from "../../assets/nutri-score/nutri-score-a.svg";
import img_placeholder from "../../assets/placeholders/product-photo-placeholder.svg";
import {act} from "react";

jest.mock("../../stores/ScanStore", () => ({
    scanStore: {
        addScannedProductToPurchase: jest.fn()
    }
}));

jest.mock("../../utils/Toasts", () => ({
    achievementToast: jest.fn()
}));

const mockProps = {
    imageURL: "",
    id: "123456",
    name: "Test Product",
    brand: "Test Brand",
    score: "a"
};

describe("ProductInfo Component with Achievements", () => {
    let input, decrementButton, incrementButton;

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

    it("calls scanStore.addScannedProductToPurchase and achievementUnlockedToast correctly", async () => {
        const addButton = screen.getByRole("button", { name: /add to purchased products/i });
        const mockAchievements = [
            { achievementName: "First Scan", level: 1 },
            { achievementName: "Healthy Choices", level: 2 }
        ];

        scanStore.addScannedProductToPurchase.mockResolvedValue(mockAchievements);

        await act(async () => {
            fireEvent.click(addButton);
        });

        expect(scanStore.addScannedProductToPurchase).toHaveBeenCalledWith(1);

        expect(achievementToast).toHaveBeenCalledTimes(mockAchievements.length);
        expect(achievementToast).toHaveBeenCalledWith("First Scan", 1);
        expect(achievementToast).toHaveBeenCalledWith("Healthy Choices", 2);
    });

    it("does not trigger achievementToast if no achievements are unlocked", async () => {
        const addButton = screen.getByRole("button", { name: /add to purchased products/i });

        scanStore.addScannedProductToPurchase.mockResolvedValue(null);

        await act(async () => {
            fireEvent.click(addButton);
        });

        expect(scanStore.addScannedProductToPurchase).toHaveBeenCalledWith(1);

        expect(achievementToast).not.toHaveBeenCalled();
    });

    it("updates quantity value on manual input change", () => {
        fireEvent.change(input, { target: { value: "3" } });

        expect(input).toHaveValue(3);
    });

    it("does not update quantity value on manual input over 9999", () => {
        fireEvent.change(input, { target: { value: "99999" } });

        expect(input).toHaveValue(1);
    });

    it("does not update quantity value on manual input below 1", () => {
        fireEvent.change(input, { target: { value: "0" } });

        expect(input).toHaveValue(1);
    });
});
