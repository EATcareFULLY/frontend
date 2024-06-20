import { makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";


class ScanStore {
    scannedProductCode = '';
    scannedProduct = null;

    constructor() {
        makeAutoObservable(this);
    }

    setProductCode(productCode) {
        this.scannedProductCode=productCode;
        console.log('storeCode', this.scannedProductCode);
    }

    async getScannedProduct(){
        this.scannedProduct = await ApiService.getScannedProduct(this.scannedProductCode);
        console.log('storeProduct', this.scannedProduct);
    }

    resetScannedProduct(){
        this.scannedProduct = null;
        console.log('storeProduct', this.scannedProduct);
    }

    async getTestProduct(){
        this.scannedProduct = await ApiService.getTestProduct();
        console.log('storeProduct', this.scannedProduct);
    }

}

export const scanStore = new ScanStore();