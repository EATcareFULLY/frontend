import { render, screen, waitFor } from "@testing-library/react";
import Details from "../../pages/Details";
import { scanStore } from "../../stores/ScanStore";
import { act } from "react-dom/test-utils";
import Loading from "../../components/Loading";
import ProductNotFound from "../../components/ProductNotFound";
import ProductInfo from "../../components/ProductInfo";
import ProductTables from "../../components/ProductTables";

const getMockProduct = () => {
    return {
        imageURL: "www.image.pl",
        id:"11111111",
        name:"Mock Product",
        brand:"Mocks",
        score:"a",
        tags: [
            {
                id: 1,
                name: "Tag 1"
            },
            {
                id: 2,
                name: "Tag 2"
            }
        ],
        allergens:[
            {
                id: 1,
                name: "Allergen 1"
            },
            {
                id: 2,
                name: "Allergen 2"
            }
        ],
        ingredients: [
            {
                id: 1,
                name: "Ingridient 1",
                description: "Description",
                content: 20.5
            },
            {
                id: 2,
                name: "Ingridient 2",
                description: "Description",
                content: 10.0
            },
            {
                id: 3,
                name: "Ingridient 3",
                description: "Description",
                content: 7.0
            },
            {
                id: 4,
                name: "Ingridient 4",
                description: "Description",
                content: 5.0
            }
        ]
    }
}

jest.mock("../../stores/ScanStore", () => ({
    scanStore: {
        scannedProduct: null,
        getScannedProduct: jest.fn(),
        resetScannedProduct: jest.fn(),
    }
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/ProductNotFound", () => () => <div>Product Not Found</div>);
jest.mock("../../components/ProductInfo", () => () => <div>Product Info</div>);
jest.mock("../../components/ProductTables", () => () => <div>Product Tables</div>);

describe("Details Page", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading component while waiting for the product", async () => {
        render(<Details />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(scanStore.getScannedProduct).toHaveBeenCalledTimes(1);

    });

    it("renders ProductNotFound if the product ID is 0", async () => {
        scanStore.scannedProduct = { id: 0 };

        render(<Details />);

        expect(screen.getByText("Product Not Found")).toBeInTheDocument();
        expect(scanStore.getScannedProduct).toHaveBeenCalledTimes(1);
    });

    it("calls resetScannedProduct on unmount", async () => {
        const { unmount } = render(<Details />);

        unmount();

        expect(scanStore.resetScannedProduct).toHaveBeenCalledTimes(1);
    });

    it("renders product details and tables when product is found", async () => {
        scanStore.scannedProduct = getMockProduct();

        render(<Details />);

        expect(screen.getByText("Product Info")).toBeInTheDocument();
        expect(screen.getByText("Product Tables")).toBeInTheDocument();
        expect(scanStore.getScannedProduct).toHaveBeenCalledTimes(1);
        expect(scanStore.scannedProduct).toEqual(getMockProduct());

    });
});
