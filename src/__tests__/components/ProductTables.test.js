import { render, screen } from "@testing-library/react";
import ProductTables from "../../components/ProductTables";

const mockTags = [{ id: 1, name: "Vegan" }, { id: 2, name: "Organic" }];
const mockAllergens = [{ id: 1, name: "Peanuts" }, { id: 2, name: "Soy" }];
const mockIngredients = [
    { id: 1, name: "Sugar", content: 10 },
    { id: 2, name: "Salt", content: 5 }
];

describe("ProductTables Component", () => {

    it("should render 'No tags found.' if tags list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No tags found.")).toBeInTheDocument();
    });

    it("should render 'No allergens found.' if allergens list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No allergens found.")).toBeInTheDocument();
    });

    it("should render 'No ingredients found.' if ingredients list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No ingredients found.")).toBeInTheDocument();
    });

    it("should render all sections with no data", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);

        expect(screen.getByText("No ingredients found.")).toBeInTheDocument();
        expect(screen.getByText("No allergens found.")).toBeInTheDocument();
        expect(screen.getByText("No tags found.")).toBeInTheDocument();
    });

    it("should render a list of tags", () => {
        render(<ProductTables tags={mockTags} allergens={[]} ingredients={[]} />);

        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Organic")).toBeInTheDocument();
    });

    it("should render a list of allergens", () => {
        render(<ProductTables tags={[]} allergens={mockAllergens} ingredients={[]} />);

        expect(screen.getByText("Peanuts")).toBeInTheDocument();
        expect(screen.getByText("Soy")).toBeInTheDocument();
    });

    it("should render a list of ingredients", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={mockIngredients} />);

        expect(screen.getByText("Sugar")).toBeInTheDocument();
        expect(screen.getByText("10%")).toBeInTheDocument();
        expect(screen.getByText("Salt")).toBeInTheDocument();
        expect(screen.getByText("5%")).toBeInTheDocument();
    });

    it("should render all sections with data", () => {
        render(<ProductTables tags={mockTags} allergens={mockAllergens} ingredients={mockIngredients} />);

        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Peanuts")).toBeInTheDocument();
        expect(screen.getByText("Sugar")).toBeInTheDocument();
        expect(screen.getByText("10%")).toBeInTheDocument();
    });
});
