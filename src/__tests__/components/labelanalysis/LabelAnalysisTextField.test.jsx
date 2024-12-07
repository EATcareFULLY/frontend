import React from "react";
import { render, screen } from "@testing-library/react";
import LabelAnalysisTextField from "../../../components/labelanalysis/LabelAnalysisTextField";

const mockTitle = "Harmful Ingridients";
const mockNotFound = "Not found."

describe("LabelAnalysisTextField", () => {

    it("renders the title and value when value is provided", () => {
        const value = "Additives like E100, E200";

        render(<LabelAnalysisTextField title={mockTitle} value={value} />);

        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it("renders 'No value provided' when value is empty", () => {
        const value = "";

        render(<LabelAnalysisTextField title={mockTitle} value={value} />);

        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockNotFound)).toBeInTheDocument();
    });

    it("renders 'No value provided' when value is null", () => {
        const value = null;

        render(<LabelAnalysisTextField title={mockTitle} value={value} />);

        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockNotFound)).toBeInTheDocument();
    });

    it("renders 'No value provided' when value is undefined", () => {
        const value = undefined;

        render(<LabelAnalysisTextField title={mockTitle} value={value} />);

        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockNotFound)).toBeInTheDocument();
    });

});
