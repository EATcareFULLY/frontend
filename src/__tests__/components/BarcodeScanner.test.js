import { render, screen } from "@testing-library/react";
import BarcodeScanner from "../../components/BarcodeScanner";


describe("Loading Component", () => {


    it("should apply default props if none provided", () => {
        render(<BarcodeScanner />);

        expect(screen.getByText("Scan the Product Barcode")).toBeInTheDocument();
        expect(screen.getByTestId("reader")).toBeInTheDocument();
    });

});
