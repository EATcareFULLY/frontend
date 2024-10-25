import History from "../../pages/History";
import {render, screen} from "@testing-library/react";
import { historyStore } from "../../stores/HistoryStore";
import { getMockList } from "../stores/HistoryStore.test";
import { act } from 'react-dom/test-utils';

describe("History page", () => {
    beforeEach(() => {
        jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    test("render page", () => {
        jest.spyOn(historyStore,"fetchAllPurchases").mockImplementation()
        render(<History/>)
        const label = screen.getByText("Purchase List")
        expect(label).toBeInTheDocument()
        expect(historyStore.fetchAllPurchases).toHaveBeenCalled()
    })
    test("render list", async () => {
        //const data = getMockList()
        jest.spyOn(historyStore,"fetchAllPurchases").mockImplementation(() => {
            historyStore.history = getMockList()
        })
        render(<History/>)
        const product1 = screen.getByText("Ketchup")
        const product2 = screen.getByText("Mustard French")
        const product3 = screen.getByText("Mayonnaise Light")
        expect(product1).toBeInTheDocument()
        expect(product2).toBeInTheDocument()
        expect(product3).toBeInTheDocument()

    })
    test("should render loading", async () => {
        const data = []
        jest.spyOn(historyStore,"fetchAllPurchases").mockImplementation(() => {
            act(() => {
                historyStore.history = []
            })
            
        })
        render(<History/>)
        const loading = screen.getByText("Loading...")
        expect(loading).toBeInTheDocument()
    })
})