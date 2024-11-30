import RestService from "./RestService";
import {errorToast, successToast} from "../utils/Toasts";
import {API_URLS} from "../utils/URLS";
import {clearCacheFor} from "../utils/Cache"

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

    static async getPurchases() {
        try {
            return await RestService.ajax(
                `${API_URLS.allpurchases}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
        }
    }

    static async getTestPurchases() {
        try {
            return await RestService.ajax(
                `${API_URLS.allpurchases}`,
                "GET",
                null
            );
        } catch (error) {
            console.error("Failed to fetch purchases:", error);
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
        clearCacheFor(API_URLS.allpurchases);
        try {
            const resoonse =  await RestService.ajax(
                `${API_URLS.purchases}`,
                "POST",
                purchaseRequest
            );
            successToast("Product added to purchased products.");

            return resoonse;

        } catch (error) {
            console.error("Failed to add " + purchaseRequest.barcode + " product:", error);

            errorToast("Failed to add product to purchased products.");
        }
    }

    static async generatePdfReport(month, year) {
        try {
            const response = await RestService.ajax(
                `${API_URLS.historyAnalysis}`,
                "GET",
                {},
                {},
                "arraybuffer",
                {
                    year: year,
                    month: month
                }
            );

            const blob = new Blob([response], { type: "application/pdf" });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "report.pdf";
            a.click();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Failed to generate PDF report:", error);
            errorToast("Failed to generate PDF report.");
        }
    }


}

export default ApiService;