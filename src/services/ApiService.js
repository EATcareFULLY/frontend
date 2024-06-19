import RestService, {URLS} from "./RestService";

class ApiService {

    static async getTestProducts() {
        try {
            return await RestService.ajax(
                `${URLS.testproducts}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch test products:", error);
        }
    }
    static async getTestPurchases() {
        try {
            return await RestService.ajax(
                `${URLS.testpurchases}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch test product:", error);
        }
    }


    static async getTestProduct() {
        try {
            return await RestService.ajax(
                `${URLS.testproduct}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch test product:", error);
        }
    }


    static async getScannedProduct(productCode) {
        try {
            return await RestService.ajax(
                `${URLS.testproduct}?code=${productCode}`,
                "GET",
                null,
                null
            );
        } catch (error) {
            console.error("Failed to fetch scanned product:", error);
        }
    }


}

export default ApiService;