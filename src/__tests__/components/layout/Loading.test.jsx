import { render, screen } from "@testing-library/react";
import Loading from "../../../components/layout/Loading";
import { PulseLoader } from "react-spinners";

jest.mock("react-spinners", () => ({
    PulseLoader: jest.fn(() => <div>Mocked Loader</div>)
}));

describe("Loading Component", () => {


    it("should apply default props if none provided", () => {
        render(<Loading />);

        expect(PulseLoader).toHaveBeenCalledWith(expect.objectContaining({
            loading: true,
            size: 20,
            color: "#011818"
        }), {});
    });

    it("should pass the correct props to PulseLoader", () => {
        const loaderProps = { loading: true, size: 15, color: "#ff0000" };

        render(<Loading {...loaderProps} />);

        expect(PulseLoader).toHaveBeenCalledWith(expect.objectContaining(loaderProps), {});
    });

});
