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

        this.scannedProduct = this.sortIngredientsOfProduct(product);
        console.log('storeProduct', this.scannedProduct);
    }

    sortIngredientsOfProduct(product) {
        if (product && product.ingredients) {
            product.ingredients.sort((a, b) => b.content - a.content);
        }
        return product;
    }

    resetScannedProduct(){
        this.scannedProduct = null;
        console.log('storeProduct', this.scannedProduct);
    }

    async addScannedProductToPurchase(quantity){

        const response = await ApiService.addProductToPurchased(this.scannedProduct.id, quantity);
        await historyStore.fetchAllPurchases()
        if (response && response.unlockedAchievements) {
            return response.unlockedAchievements;
        } else {
            return null;
        }
    }

    async getTestProduct(){

        this.scannedProduct = await ApiService.getTestProduct();
        console.log('storeProduct', this.scannedProduct);
    }

}

export const scanStore = new ScanStore();