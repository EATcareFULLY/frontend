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
        labelAnalysis: {
            chat_response: "Mock general analysis",
            harmful_additive_list: ["Mock additive 1", "Mock additive 2"],
        },
        labelImg: "data:image/jpeg;base64,testbase64data",
        labelText: "Mock label text",
        analyzeLabel: jest.fn(),
        resetLabelDescription: jest.fn(),
    },
}));

jest.mock("../../components/Loading", () => () => <div>Loading...</div>);
jest.mock("../../components/LabelSubmitted", () => ({ image, text }) => (
    <div>
        <img alt="Submitted label" src={image} />
        <p>{text}</p>
    </div>
));
jest.mock("../../components/LabelAnalysisDisplay", () => ({ analysis, additives }) => (
    <div>
        <p>{analysis}</p>
        <ul>
            {additives.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    </div>
));
jest.mock("../../components/LabelButtonsWrapper", () => ({ children }) => <div>{children}</div>);

describe("LabelAnalysis Page", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        jest.clearAllMocks();
    });

    it("calls analyzeLabel when the component renders", () => {
        render(<LabelAnalysis />);

        expect(labelStore.analyzeLabel).toHaveBeenCalledTimes(1);
    });


    it("renders the analysis UI when labelAnalysis is defined", () => {
        render(<LabelAnalysis />);

        expect(screen.getByText("Submitted label")).toBeInTheDocument();
        expect(screen.getByAltText("Submitted label")).toHaveAttribute(
            "src",
            "data:image/jpeg;base64,testbase64data"
        );
        expect(screen.getByText("Mock label text")).toBeInTheDocument();

        expect(screen.getByText("Mock general analysis")).toBeInTheDocument();
        expect(screen.getByText("Mock additive 1")).toBeInTheDocument();
        expect(screen.getByText("Mock additive 2")).toBeInTheDocument();
    });

    it("calls analyzeLabel when Regenerate analysis button is clicked", () => {
        render(<LabelAnalysis />);

        const regenerateButton = screen.getByText("Regenerate analysis");
        fireEvent.click(regenerateButton);

        expect(labelStore.analyzeLabel).toHaveBeenCalledTimes(2);
    });

    it("navigates to /Label when Analyze another label button is clicked", () => {
        render(<LabelAnalysis />);

        const anotherLabelButton = screen.getByText("Analyze another label");
        fireEvent.click(anotherLabelButton);

        expect(mockNavigate).toHaveBeenCalledWith("/Label");
    });

    it("calls resetLabelDescription on unmount", () => {
        const { unmount } = render(<LabelAnalysis />);

        unmount();

        expect(labelStore.resetLabelDescription).toHaveBeenCalledTimes(1);
    });

    it("renders the loading component when labelAnalysis is undefined", () => {
        labelStore.labelAnalysis = null;

        render(<LabelAnalysis />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(labelStore.analyzeLabel).toHaveBeenCalled();
    });
});
