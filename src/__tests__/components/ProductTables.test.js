import { render, screen } from "@testing-library/react";
import ProductTables from "../../components/ProductTables";

const mockTags = [
    { id: 1, name: "Vegan" },
    { id: 2, name: "Eco packaging" },
    { id: 3, name: "Gluten free" },
];
const mockAllergens = [{ id: 1, name: "Peanuts" }, { id: 2, name: "Soy" }];
const mockIngredients = [
    { id: 1, name: "Sugar", content: 10.001 },
    { id: 2, name: "Salt", content: 5 },
];

describe("ProductTables Component", () => {
    it("renders 'No tags found.' if the tags list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No tags found.")).toBeInTheDocument();
    });

    it("renders 'No allergens found.' if the allergens list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No allergens found.")).toBeInTheDocument();
    });

    it("renders 'No ingredients found.' if the ingredients list is empty", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No ingredients found.")).toBeInTheDocument();
    });

    it("renders all sections with no data", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("No tags found.")).toBeInTheDocument();
        expect(screen.getByText("No allergens found.")).toBeInTheDocument();
        expect(screen.getByText("No ingredients found.")).toBeInTheDocument();
    });

    it("renders a list of tags with corresponding icons", () => {
        render(<ProductTables tags={mockTags} allergens={[]} ingredients={[]} />);
        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Eco packaging")).toBeInTheDocument();
        expect(screen.getByText("Gluten free")).toBeInTheDocument();

        expect(screen.getByTestId("FaSeedling")).toBeInTheDocument();
        expect(screen.getByTestId("FaRecycle")).toBeInTheDocument();
        expect(screen.getByTestId("LuWheatOff")).toBeInTheDocument();
    });

    it("renders a list of allergens", () => {
        render(<ProductTables tags={[]} allergens={mockAllergens} ingredients={[]} />);
        expect(screen.getByText("Peanuts")).toBeInTheDocument();
        expect(screen.getByText("Soy")).toBeInTheDocument();
    });

    it("renders a list of ingredients with content rounded to 2 decimals", () => {
        render(<ProductTables tags={[]} allergens={[]} ingredients={mockIngredients} />);
        expect(screen.getByText("Sugar")).toBeInTheDocument();
        expect(screen.getByText("10.00")).toBeInTheDocument();
        expect(screen.getByText("Salt")).toBeInTheDocument();
        expect(screen.getByText("5.00")).toBeInTheDocument();
    });

    it("renders all sections with data, including icons for tags", () => {
        render(
            <ProductTables
                tags={mockTags}
                allergens={mockAllergens}
                ingredients={mockIngredients}
            />
        );

        expect(screen.getByText("Vegan")).toBeInTheDocument();
        expect(screen.getByText("Eco packaging")).toBeInTheDocument();
        expect(screen.getByText("Gluten free")).toBeInTheDocument();

        expect(screen.getByText("Peanuts")).toBeInTheDocument();
        expect(screen.getByText("Soy")).toBeInTheDocument();

        expect(screen.getByText("Sugar")).toBeInTheDocument();
        expect(screen.getByText("10.00")).toBeInTheDocument();
    });
});
