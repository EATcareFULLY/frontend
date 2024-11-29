import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { labelStore } from "../../stores/LabelStore";
import { useNavigate } from "react-router-dom";
import LabelAnalysis from "../../pages/LabelAnalysis";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
}));

jest.mock("../../stores/LabelStore", () => ({
    labelStore: {
        labelDescription: "Mock analysis description",
        labelImg: "data:image/jpeg;base64,testbase64data",
        analyzeLabelFromImage: jest.fn()
    }
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);


describe("LabelAnalysis Component", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    it("renders the analysis UI when labelDescription is not empty", () => {
        render(<LabelAnalysis />);

        expect(screen.getByText("Our analysis")).toBeInTheDocument();
        expect(screen.getByText("Mock analysis description")).toBeInTheDocument();
        expect(screen.getByAltText("Label")).toBeInTheDocument();
    });

    it("calls analyzeLabelFromImage when Regenerate analysis button is clicked", () => {
        render(<LabelAnalysis />);

        const regenerateButton = screen.getByText("Regenerate analysis");
        fireEvent.click(regenerateButton);

        expect(labelStore.analyzeLabelFromImage).toHaveBeenCalled();
    });

    it("navigates to /Label when Analyze another label button is clicked", () => {
        render(<LabelAnalysis />);

        const anotherLabelButton = screen.getByText("Analyze another label");
        fireEvent.click(anotherLabelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/Label");
    });

    it("renders the Loading component when labelDescription is empty", () => {
        labelStore.labelAnalysis = "";

        render(<LabelAnalysis />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
