import { makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";
import {Slide, toast} from "react-toastify";


class ScanStore {
    scannedProductCode = '';
    scannedProduct = null;

    constructor() {
        makeAutoObservable(this);
    }

    setProductCode(productCode) {
        this.scannedProductCode=productCode;
        localStorage.setItem('scannedProductCode', productCode);
        console.log('storeCode', this.scannedProductCode);
    }

    getProductCodeFromStorage(){
        const storedProductCode = localStorage.getItem('scannedProductCode');

        if (storedProductCode) {
            this.scannedProductCode = storedProductCode;
        } else {
            this.scannedProductCode = '00000000';
        }

    }

    async getScannedProduct(){

        if(this.scannedProductCode === ''){
            this.getProductCodeFromStorage();
        }

        console.log('storeCode', this.scannedProductCode);

        let product = await ApiService.getScannedProduct(this.scannedProductCode);

        if (product && product.ingredients) {
            product.ingredients.sort((a, b) => b.content - a.content);
        }

        this.scannedProduct = product;
        console.log('storeProduct', this.scannedProduct);
    }

    resetScannedProduct(){
        this.scannedProduct = null;
        console.log('storeProduct', this.scannedProduct);
    }

    async addScannedProductToPurchase(quantity){

        await ApiService.addProductToPurchased(this.scannedProduct.id, quantity);
    }

    async getTestProduct(){
        this.scannedProduct = await ApiService.getTestProduct();
        console.log('storeProduct', this.scannedProduct);
    }

}

export const scanStore = new ScanStore();