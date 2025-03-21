import {APP_ROOT_URL} from "./utils/URLS";

function swDev() {
    let url = `${APP_ROOT_URL}/sw.js`;
    console.log(url);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(url).then((registration) => {
            console.warn("Service worker registered:", registration);

            if (registration.waiting) {
                console.log("New service worker waiting.");
                registration.waiting.postMessage({type: 'SKIP_WAITING'});
            }

            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing;
                if (newWorker) {
                    console.log("New service worker found.");
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                console.log("New service worker installed and waiting.");
                                newWorker.postMessage({type: 'SKIP_WAITING'});
                            }
                        }
                    });
                }
            });
        }).catch((error) => {
            console.error("Service worker registration failed:", error);
        });
    } else {
        console.log("Service worker is not supported in this browser.");
    }

}

export default swDev;
