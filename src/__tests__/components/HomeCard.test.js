import { render, screen } from "@testing-library/react";
import HomeCard from "../../components/HomeCard";

const mockProps = {
    title: "AAA",
    body: "BBBBBBBBB"
};

describe("HomeCard Component", () => {

    beforeEach(() => {
        render(<HomeCard {...mockProps} />);
    });

    it("renders the title correctly", () => {
        const titleElement = screen.getByText(mockProps.title);
        expect(titleElement).toBeInTheDocument();
    });

    it("renders the body text correctly", () => {
        const bodyElement = screen.getByText(mockProps.body);
        expect(bodyElement).toBeInTheDocument();
    });
});
