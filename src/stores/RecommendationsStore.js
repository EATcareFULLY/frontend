import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import StorageManager from "../utils/StorageManager";

class RecommendationsStore {
    currentProductsRecommendations = {};

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentProductsRecommendations(productsRecommendations) {
        this.currentProductsRecommendations=productsRecommendations;
        console.log('currentProductsRecommendations', this.currentProductsRecommendations);
    }

    // setCurrentProductsRecommendations(productsRecommendations) {
    //     this.currentProductsRecommendations=productsRecommendations;
    //     StorageManager.saveData('currentProductsRecommendations', productsRecommendations);
    //     console.log('currentProductsRecommendations', this.currentProductsRecommendations);
    // }

    // getCurrentProductsRecommendationsFromStorage(){
    //     const storedCurrentRecommendations = StorageManager.getData('currentProductsRecommendations');

    //     if (storedCurrentRecommendations) {
    //         this.currentProductsRecommendations = storedCurrentRecommendations;
    //     } else {
    //         this.currentProductsRecommendations = {};
    //     }

    // }

    // setRecommendationsForProduct(productCode, recommendations) {
    //     this.currentProductsRecommendations[productCode] = recommendations;
    // }

    async fetchRecommendations() {
            try {
                const recommendations = await ApiService.getRecommendations();
                
                this.setCurrentProductsRecommendations(recommendations);
    
                return recommendations;
                
            } catch (error) {
                console.error(`Failed to fetch recommendations today recommendations`);
                throw error;
            }
        }




    // async getRecommendations(productCode) {
    //     try {
    //         // Validate product code
    //         if (!productCode) {
    //             throw new Error('Product code is required');
    //         }
    //         const currentProductsRecommendations = this.getCurrentProductsRecommendationsFromStorage();

    //         // Check storage first
    //         if (currentProductsRecommendations[productCode]) {
    //             console.log(`Returning stored recommendations for product: ${productCode}`);
    //             return currentProductsRecommendations[productCode];
    //         }

    //         // Fetch new recommendations if not in storage
    //         const recommendations = await ApiService.getRecommendations();
            
    //         if (recommendations && Array.isArray(recommendations)) {
    //             this.setRecommendationsForProduct(productCode, recommendations);
    //         }

    //         return recommendations;
            
    //     } catch (error) {
    //         console.error(`Failed to fetch recommendations for product: ${productCode}`);
    //         throw error;
    //     }
    // }

}

export const recommendationsStore = new RecommendationsStore();
