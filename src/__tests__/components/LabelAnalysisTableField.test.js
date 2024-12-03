import React from "react";
import { render, screen } from "@testing-library/react";
import LabelAnalysisTableField from "../../components/LabelAnalysisTableField";

describe("LabelAnalysisTableField Component", () => {

    it("renders 'No harmful additives found.' when additives is empty", () => {
        render(<LabelAnalysisTableField additives={[]} />);

        expect(screen.getByText("No harmful additives found.")).toBeInTheDocument();
    });

    it("renders 'No harmful additives found.' when additives is null", () => {
        render(<LabelAnalysisTableField additives={null} />);

        expect(screen.getByText("No harmful additives found.")).toBeInTheDocument();
    });

    it("renders a table with harmful additives when additives is provided", () => {
        const additives = [
            { code: "E100", name: "Curcumin", desc: "A natural yellow dye" },
            { code: "E200", name: "Sorbic Acid", desc: "Preservative" }
        ];

        render(<LabelAnalysisTableField additives={additives} />);

        const table = screen.getByRole("table");
        expect(table).toBeInTheDocument();

        expect(screen.getByText("Code")).toBeInTheDocument();
        expect(screen.getByText("Name")).toBeInTheDocument();
        expect(screen.getByText("Description")).toBeInTheDocument();

        expect(screen.getByText("E100")).toBeInTheDocument();
        expect(screen.getByText("Curcumin")).toBeInTheDocument();
        expect(screen.getByText("A natural yellow dye")).toBeInTheDocument();

        expect(screen.getByText("E200")).toBeInTheDocument();
        expect(screen.getByText("Sorbic Acid")).toBeInTheDocument();
        expect(screen.getByText("Preservative")).toBeInTheDocument();
    });

    it("does not render a table if additives is empty or null", () => {
        render(<LabelAnalysisTableField additives={[]} />);

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("renders the correct title", () => {
        render(<LabelAnalysisTableField additives={[]} />);

        expect(screen.getByText("Harmful additives details")).toBeInTheDocument();
    });
});
