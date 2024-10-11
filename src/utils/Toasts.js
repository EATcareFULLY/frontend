import {Slide, toast} from "react-toastify";

const commonToastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
};


export const successToast = (message) => {
    toast.success(message, {
        ...commonToastOptions,
    });
}


export const warningToast = (message) => {
    toast.warning(message, {
        ...commonToastOptions,
    });
}


export const errorToast = (message) => {
    toast.error(message, {
        ...commonToastOptions,
    });
}