import { render, screen } from "@testing-library/react";
import BarcodeScanner from "../../../components/scan/BarcodeScanner";


describe("Barcode Scanner Component", () => {


    it("should render element properly", () => {
        render(<BarcodeScanner />);

        expect(screen.getByText("Scan barcode")).toBeInTheDocument();
        expect(screen.getByTestId("reader")).toBeInTheDocument();
    });

});
