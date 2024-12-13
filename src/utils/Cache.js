export function clearCacheFor(url) {
    // console.log("removing",url)
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            type: 'CLEAR_CACHE',
            url: url
        });
    }
}