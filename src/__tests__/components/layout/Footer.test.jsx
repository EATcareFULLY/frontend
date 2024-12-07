import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "../../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import eatcarefullylogo from "../../../assets/logos/logo-full.svg";
import githublogo from "../../../assets/logos/github-logo.svg";

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn()
}));

const mockNavigate = jest.fn();

describe("Footer Component", () => {

    beforeEach(() => {
        useNavigate.mockReturnValue(mockNavigate);
        render(<Footer />);
    });

    it("should display the EATcareFULLY logo with the correct alt text", () => {
        const logo = screen.getByAltText("EATcareFULLY");
        expect(logo).toBeInTheDocument();
        expect(logo).toHaveAttribute("src", eatcarefullylogo);
    });

    it("should display the GitHub logo with the correct alt text and link", () => {
        const githubLink = screen.getByRole("link", { name: /GitHub/i });
        const githubImage = screen.getByAltText("GitHub");

        expect(githubLink).toHaveAttribute("href", "https://github.com/EATcareFULLY");
        expect(githubImage).toHaveAttribute("src", githublogo);
    });

    it("should navigate to home page when clicking the EATcareFULLY logo", () => {
        const logo = screen.getByAltText("EATcareFULLY");

        fireEvent.click(logo);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });

    it("should display the copyright text", () => {
        expect(screen.getByText("© 2024 EATcareFULLY.")).toBeInTheDocument();
    });
});
