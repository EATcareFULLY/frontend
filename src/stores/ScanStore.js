import { makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";


class ScanStore {
    productCode = '';
    testProducts = null;

    constructor() {
        makeAutoObservable(this);
    }

    setProductCode(productCode) {
        this.productCode=productCode;
        console.log('store', this.productCode)
    }

    /* TO TYMCZASOWO JAKO REFERENCJA TO OGÓLNIE RACZEJ DO TEGO STORE NIE PASUJE
    async getTestProducts(){
        this.testProducts = await ApiService.getTestProducts();
    }*/

}

export const scanStore = new ScanStore();