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

    async getScannedProduct(productCode){
        this.scannedProduct = await ApiService.getScannedProduct(productCode);
    }

    async getTestProduct(){
        this.scannedProduct = await ApiService.getTestProduct();
        console.log('storeProduct', this.scannedProduct);
    }

}

export const scanStore = new ScanStore();