import RestService, {URLS} from "./RestService";
import {Slide, toast} from "react-toastify";

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
                `${URLS.products}/${productCode}`,
                "GET",
                null,
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
            const resoonse =  await RestService.ajax(
                `${URLS.purchases}`,
                "POST",
                null,
                purchaseRequest
            );

            toast.success('YASS', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                pauseOnHover: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });

            return resoonse;

        } catch (error) {
            console.error("Failed to add " + purchaseRequest.barcode + " product:", error);

            toast.error('Failed to add product to purchased', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                pauseOnHover: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Slide,
            });
        }
    }


}

export default ApiService;