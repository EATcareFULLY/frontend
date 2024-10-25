import {errorToast, successToast, warningToast} from "../../utils/Toasts";
import {toast} from "react-toastify";


describe("Toasts", () => {
    it("should call toast.success", () => {
        jest.spyOn(toast, "success");

        successToast("");

        expect(toast.success).toHaveBeenCalled();
    })
    it("should call toast.warning", () => {
        jest.spyOn(toast, "warning");

        warningToast("");

        expect(toast.warning).toHaveBeenCalled();
    })
    it("should call toast.error", () => {
        jest.spyOn(toast, "error");

        errorToast("");

        expect(toast.error).toHaveBeenCalled();
    })
} )