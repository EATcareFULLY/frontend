export const StorageManager = {
    // Saves data with a timestamp
    saveData(key, data) {
        const storageItem = {
            data: data,
            timestamp: new Date().getTime()
        };
        localStorage.setItem(key, JSON.stringify(storageItem));
    },

    // Downloads data if it was saved on the same day
    getData(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const storageItem = JSON.parse(item);
        const savedDate = new Date(storageItem.timestamp);
        const currentDate = new Date();

        // Check if the data was saved today
        if (savedDate.toDateString() !== currentDate.toDateString()) {
            // if not - delete it
            localStorage.removeItem(key);
            return null;
        }

        return storageItem.data;
    },

    // Manual clear data
    clearData(key) {
        localStorage.removeItem(key);
    }
};
export default StorageManager;
