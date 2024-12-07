import React from "react";
import { render, screen } from "@testing-library/react";
import LabelAnalysisDisplay from "../../../components/labelanalysis/LabelAnalysisDisplay";

jest.mock("../../../components/labelanalysis/LabelAnalysisTextField", () => ({ title, value }) => (
    <div data-testid="text-field">
        <strong>{title}:</strong> {value}
    </div>
));

jest.mock("../../../components/labelanalysis/LabelAnalysisBooleanField", () => ({ title, value }) => (
    <div data-testid="boolean-field">
        <strong>{title}:</strong> {value}
    </div>
));

jest.mock("../../../components/labelanalysis/LabelAnalysisTableField", () => ({ additives }) => (
    <div data-testid="table-field">
        Additives: {additives.join(", ")}
    </div>
));

const analysis = {
    harmful_ingredients: "Ingredient A, Ingredient B",
    harmful_in_excess: "Ingredient C",
    allergens: "Allergen 1",
    food_additives: "Additive X, Additive Y",
    is_highly_processed: "true",
    contains_gluten: "false",
    is_vegan: "true",
    is_vegetarian: "false",
};

const additives = ["Additive A", "Additive B"];

describe("LabelAnalysisDisplay", () => {

    beforeEach(() => {
        render(<LabelAnalysisDisplay analysis={analysis} additives={additives}  />);
    })

    it("renders LabelAnalysisTextField components with correct props", () => {

        const fields = screen.getAllByTestId("text-field");
        expect(fields).toHaveLength(4);
        expect(fields[0]).toHaveTextContent("Harmful Ingredients:");
        expect(fields[0]).toHaveTextContent(analysis.harmful_ingredients);
        expect(fields[1]).toHaveTextContent("Harmful Ingredients in Excess:");
        expect(fields[1]).toHaveTextContent(analysis.harmful_in_excess);
        expect(fields[2]).toHaveTextContent("Allergens:");
        expect(fields[2]).toHaveTextContent(analysis.allergens);
        expect(fields[3]).toHaveTextContent("Food Additives:");
        expect(fields[3]).toHaveTextContent(analysis.food_additives);
    });

    it("renders LabelAnalysisBooleanField components with correct props", () => {

        const booleanFields = screen.getAllByTestId("boolean-field");
        expect(booleanFields).toHaveLength(4);
        expect(booleanFields[0]).toHaveTextContent("Highly Processed:");
        expect(booleanFields[0]).toHaveTextContent(analysis.is_highly_processed);
        expect(booleanFields[1]).toHaveTextContent("Contains Gluten:");
        expect(booleanFields[1]).toHaveTextContent(analysis.contains_gluten);
        expect(booleanFields[2]).toHaveTextContent("Vegan:");
        expect(booleanFields[2]).toHaveTextContent(analysis.is_vegan);
        expect(booleanFields[3]).toHaveTextContent("Vegetarian:");
        expect(booleanFields[3]).toHaveTextContent(analysis.is_vegetarian);
    });

    it("renders LabelAnalysisTableField with correct additives", () => {
        
        const tableField = screen.getByTestId("table-field");
        expect(tableField).toBeInTheDocument();
        expect(tableField).toHaveTextContent("Additives: Additive A, Additive B");
    });


});
