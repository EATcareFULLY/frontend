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
                `${API_URLS.products}/eval-label`,
                "POST",
                formData
            );

            console.log("label response", response)

            return response;

        } catch (error) {

            console.error("Failed to analyze image:", error);
            errorToast("Failed to upload image.");
        }
    }
}

export default ApiService;