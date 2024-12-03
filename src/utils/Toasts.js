import {Slide, toast} from "react-toastify";
import {achievementBadgePath} from "./ImagePaths";


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


export const achievementToast = (achievementName, achievementLevel) => {
    const message = `Congratulations! You just unlocked ${achievementName} - ${achievementLevel}!`;
    const badgePath = achievementBadgePath(achievementName, achievementLevel);
    const badge = <img src={badgePath} alt={`${achievementName} Badge`}/>;

    console.log(message, badge);

    toast(message, {
        icon: badge,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        pauseOnHover: true,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
        className: "large-toast"
    });
}