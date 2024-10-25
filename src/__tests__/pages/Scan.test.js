import { render, screen, fireEvent } from "@testing-library/react";
import Scan from "../../pages/Scan";
import { scanStore } from "../../stores/ScanStore";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../../utils/Toasts";

jest.mock("../../stores/ScanStore", () => ({
    scanStore: {
        setProductCode: jest.fn(),
    },
}));

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("../../components/BarcodeForm", () => ({ barcodeSubmition }) => (
    <button onClick={() => barcodeSubmition(mockBarcode)}>Submit Barcode</button>
));

jest.mock("../../components/BarcodeScanner", () => ({ barcodeSubmition }) => (
    <button onClick={() => barcodeSubmition(mockBarcode)}>Scan Barcode</button>
));

jest.mock("../../utils/Toasts", () => ({
    errorToast: jest.fn(),
}));

const mockNavigate = jest.fn();
let mockBarcode = "";

describe("Scan Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    const validBarcodes = ["12345678", "123456789012", "1234567890123", "12345678901234"];
    const invalidBarcodes = ["abc123", "12345abc", "1234", "123-1234", "1234567 ", ""];

    validBarcodes.forEach((barcode) => {
        it(`submits valid barcode ${barcode} and navigates to details`, () => {
            mockBarcode = barcode;

            render(<Scan />);

            fireEvent.click(screen.getByText("Submit Barcode"));

            expect(errorToast).not.toHaveBeenCalled();
            expect(scanStore.setProductCode).toHaveBeenCalledWith(barcode);
            expect(mockNavigate).toHaveBeenCalledWith("/Details");
        });
    });

    invalidBarcodes.forEach((barcode) => {
        it(`shows error toast for invalid barcode ${barcode}`, () => {
            mockBarcode = barcode;

            render(<Scan />);

            fireEvent.click(screen.getByText("Submit Barcode"));

            expect(errorToast).toHaveBeenCalledWith("Invalid barcode format.");
            expect(scanStore.setProductCode).not.toHaveBeenCalled();
            expect(mockNavigate).not.toHaveBeenCalled();
        });

        it("renders Scan page correctly", () => {
            render(<Scan />);

            expect(screen.getByText("Submit Barcode")).toBeInTheDocument();
            expect(screen.getByText("Scan Barcode")).toBeInTheDocument();
        });
    });
});
