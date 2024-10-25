import {render, screen} from "@testing-library/react";
import Analyze from "../../pages/Analyze"
import { historyStore } from "../../stores/HistoryStore";
import { getMockList } from "../stores/HistoryStore.test";
import { act } from 'react-dom/test-utils';

jest.mock('react-chartjs-2', () => ({
    Doughnut: () => <div>Mocked Doughnut Chart</div>,
    Bar: () => <div>Mocked Bar Chart</div>,
  }));

describe("Analyze page", () => {
    beforeEach(()=> {
        jest.clearAllMocks()
        jest.restoreAllMocks()
    }) 

    
    test("renders the main page heading", () => {
        jest.spyOn(historyStore, "fetchAllPurchases").mockImplementation();
        render(<Analyze />);
        const label = screen.getByText("Purchase Analysis");
        expect(label).toBeInTheDocument();
    });

    test("renders the list of purchased products", async () => {
        jest.spyOn(historyStore, "fetchAllPurchases").mockImplementation(() => {
            historyStore.history = getMockList();
        });
        
        render(<Analyze />);
        
        const product1 = await screen.findByText("Ketchup");
        expect(product1).toBeInTheDocument();

        const product2 = screen.getByText("Mustard French");
        expect(product2).toBeInTheDocument();

        const product3 = screen.getByText("Mayonnaise Light");
        expect(product3).toBeInTheDocument();
    });

    test("renders the healthy score", async () => {
        jest.spyOn(historyStore, "fetchAllPurchases").mockImplementation(() => {
            historyStore.history = getMockList();
        });

        jest.spyOn(historyStore, "getAverageScore").mockReturnValue("B");

        render(<Analyze />);

        const scoreLabel = await screen.findByText(/Your healthy score: B/i);
        expect(scoreLabel).toBeInTheDocument();
    });

    test("renders most frequently bought products table", async () => {
        jest.spyOn(historyStore, "fetchAllPurchases").mockImplementation(() => {
            historyStore.history = getMockList();
        });

        render(<Analyze />);

        const tableHeader = screen.getByText("Most frequently bought");
        expect(tableHeader).toBeInTheDocument();

        const product1Row = await screen.findByText("Ketchup");
        const product2Row = screen.getByText("Mustard French");
        const product3Row = screen.getByText("Mayonnaise Light");

        expect(product1Row).toBeInTheDocument();
        expect(product2Row).toBeInTheDocument();
        expect(product3Row).toBeInTheDocument();
    });

    test("renders chart titles", async () => {
        jest.spyOn(historyStore, "fetchAllPurchases").mockImplementation(() => {
            historyStore.history = getMockList();
        });

        render(<Analyze />);

        const scoreChartTitle = screen.getByText("Score Frequency");
        const tagChartTitle = screen.getByText("Tag Categories (%)");

        expect(scoreChartTitle).toBeInTheDocument();
        expect(tagChartTitle).toBeInTheDocument();
    });
        
})