import RestService from "./RestService";
import {errorToast, successToast} from "../utils/Toasts";
import {API_URLS} from "../utils/URLS";

class ApiService {

    static async getTestProducts() {
        try {
            return await RestService.ajax(
                `${API_URLS.testproducts}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch test products:", error);
        }
    }
    static async getTestPurchases() {
        try {
            return await RestService.ajax(
                `${API_URLS.testpurchases}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch test product:", error);
        }
    }


    static async getTestProduct() {
        try {
            return await RestService.ajax(
                `${API_URLS.testproduct}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch test product:", error);
        }
    }


    static async getScannedProduct(productCode) {
        try {
            return await RestService.ajax(
                `${API_URLS.products}/${productCode}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch scanned product:", error);
        }
    }


    static async addProductToPurchased(barcode, quantity) {

        const purchaseRequest = {
            barcode: barcode,
            quantity: quantity
        };

        try {
            const response =  await RestService.ajax(
                `${API_URLS.purchases}`,
                "POST",
                purchaseRequest
            );

            successToast("Product added to purchased products.");

            return response;

        } catch (error) {
            console.error("Failed to add " + purchaseRequest.barcode + " product:", error);

            errorToast("Failed to add product to purchased products.");
        }
    }

    static async analyzeLabelImg(imageBlob) {

        const formData = new FormData();
        formData.append("file", imageBlob, "label.jpeg");

        try {
            const response =  await RestService.ajax(
                `${API_URLS.label}/file`,
                "POST",
                formData
            );

            console.log("label response img", response)

            return response;

        } catch (error) {

            console.error("Failed to analyze image:", error);
            errorToast("Failed to analyze product.");

            throw error;
        }
    }

    static async analyzeLabelText(labelText) {

        const dto = {
            labelText: labelText
        };

        try {
            const response =  await RestService.ajax(
                `${API_URLS.label}/text`,
                "POST",
                dto
            );

            console.log("label response text", response)

            return response;

        } catch (error) {

            console.error("Failed to analyze text:", error);
            errorToast("Failed to analyze product.");
        }
    }

    static async getAllAchievements() {
        try {
            return await RestService.ajax(
                `${API_URLS.achievements}/all`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch achievements:", error);
        }
    }

    static async getRanking() {
        try {
            return await RestService.ajax(
                `${API_URLS.leaderboard}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch achievements:", error);
        }
    }

    static async getSettings() {
        try {
            return await RestService.ajax(
                `${API_URLS.settings}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch achievements:", error);
        }
    }

    static async updateSettings(thresholds, preferences) {

        const settings = {
            thresholds: thresholds,
            preferences: preferences
        };

        try {
            const response =  await RestService.ajax(
                `${API_URLS.settings}/update`,
                "POST",
                settings
            );

            console.log("Settings POST response", response);

            return response;

        } catch (error) {
            console.error("Failed to save settings", error);

            errorToast("Failed to save setting.");
        }
    }

    /* FUNCTION TO SETUP PREFERENCES DURING TESTING
    static async createPref() {
        try {
            await RestService.ajax(
                `http://localhost:8081/api/test/create-preference-name?name=Milk`,
                "POST",
                null
            );
            await RestService.ajax(
                `http://localhost:8081/api/test/create-preference-name?name=Organic`,
                "POST",
                null
            );
            await RestService.ajax(
                `http://localhost:8081/api/test/create-preference-name?name=Vegetarian`,
                "POST",
                null
            );
            await RestService.ajax(
                `http://localhost:8081/api/test/create-preference-name?name=Eggs`,
                "POST",
                null
            );
            await RestService.ajax(
                `http://localhost:8081/api/test/create-preference-name?name=Nuts`,
                "POST",
                null
            );
            return await RestService.ajax(
                `http://localhost:8081/api/test/preference-name/all`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to create pref:", error);
        }
    }


    static async checkPref() {
        try {
            return await RestService.ajax(
                `http://localhost:8081/api/test/preference-name/all`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to get prefs:", error);
        }
    }

    static async setupSettings() {

        const settings = {
            thresholds: {
                fat_threshold: 222,
                protein_threshold: 500,
                carbon_threshold: 875,
                calorie_threshold: 5000

            },
            preferences: [

                {
                    "name": "Milk",
                    "wanted": -1
                },
                {
                    "name": "Eggs",
                    "wanted": 0
                },
                {
                    "name": "Organic",
                    "wanted": -1
                },
                {
                    "name": "Vegetarian",
                    "wanted": 1
                },
                {
                    "name": "Nuts",
                    "wanted": -1
                }
            ]
        };

        try {
            const response =  await RestService.ajax(
                `${API_URLS.settings}/update`,
                "POST",
                settings
            );

            successToast("Settings saved successfully.");

            return response;

        } catch (error) {
            console.error("Failed to save settings", error);

            errorToast("Failed to save setting.");
        }
    }*/





}

export default ApiService;