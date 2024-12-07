import React from "react";
import { render, screen } from "@testing-library/react";
import LabelAnalysisBooleanField from "../../../components/labelanalysis/LabelAnalysisBooleanField";

describe("LabelAnalysisBooleanField Component", () => {
    it("renders FaCheck icon when value is 'true'", () => {
        render(<LabelAnalysisBooleanField title="Test Field" value="true" />);

        const checkIcon = screen.getByTestId("fa-check-icon");
        expect(checkIcon).toBeInTheDocument();
    });

    it("renders FaTimes icon when value is 'false'", () => {
        render(<LabelAnalysisBooleanField title="Test Field" value="false" />);

        const timesIcon = screen.getByTestId("fa-times-icon");
        expect(timesIcon).toBeInTheDocument();
    });

    it("renders FaQuestion icon when value is neither 'true' nor 'false'", () => {
        render(<LabelAnalysisBooleanField title="Test Field" value="undefined" />);

        const questionIcon = screen.getByTestId("fa-question-icon");
        expect(questionIcon).toBeInTheDocument();
    });

    it("renders the title correctly", () => {
        render(<LabelAnalysisBooleanField title="Test Field" value="true" />);

        const titleElement = screen.getByText("Test Field");
        expect(titleElement).toBeInTheDocument();
    });
});
