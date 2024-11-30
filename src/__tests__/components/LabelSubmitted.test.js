import React from "react";
import { render, screen } from "@testing-library/react";
import LabelSubmitted from "../../components/LabelSubmitted";

const errorMessage  = "No label submitted - try reloading page.";

describe("LabelSubmitted Component", () => {

    it("should render the image when 'image' prop is provided", () => {
        const mockImage = "mockImage.png";
        render(<LabelSubmitted image={mockImage} text={null}/>);

        const imgElement = screen.getByAltText("Label");
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute("src", mockImage);
    });

    it("should render the text when 'text' prop is provided", () => {
        const mockText = "This is the submitted label text.";
        render(<LabelSubmitted image={null} text={mockText} />);

        const textElement = screen.getByText(mockText);
        expect(textElement).toBeInTheDocument();
    });

    it("should display the default message when neither 'image' nor 'text' props are provided", () => {
        render(<LabelSubmitted image={null} text={null} />);

        const defaultMessage = screen.getByText(errorMessage);
        expect(defaultMessage).toBeInTheDocument();
    });

});
