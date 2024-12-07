import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";

class RecommendationsStore {
    currentProductsRecommendations = {};

    constructor() {
        makeAutoObservable(this);
    }

    setCurrentProductsRecommendations(productsRecommendations) {
        this.currentProductsRecommendations=productsRecommendations;
        localStorage.setItem('currentProductsRecommendations', productsRecommendations);
        console.log('currentProductsRecommendations', this.currentProductsRecommendations);
    }

    getCurrentProductsRecommendationsFromStorage(){
        const storedCurrentRecommendations = localStorage.getItem('currentProductsRecommendations');

        if (storedCurrentRecommendations) {
            this.currentProductsRecommendations = storedCurrentRecommendations;
        } else {
            this.currentProductsRecommendations = {};
        }

    }

    saveRecommendations

    setRecommendationsForProduct(productCode, recommendations) {
        this.currentProductsRecommendations[productCode] = recommendations;
    }


    async getRecommendations(productCode) {
        try {
            // Validate product code
            if (!productCode) {
                throw new Error('Product code is required');
            }
            const currentProductsRecommendations = this.getCurrentProductsRecommendationsFromStorage();

            // Check storage first
            if (currentProductsRecommendations[productCode]) {
                console.log(`Returning stored recommendations for product: ${productCode}`);
                return currentProductsRecommendations[productCode];
            }

            // Fetch new recommendations if not in storage
            const recommendations = await ApiService.getRecommendations(productCode);

            if (recommendations && Array.isArray(recommendations)) {
                SetRecommendationsForProduct(productCode, recommendations);
            }

            return recommendations;

        } catch (error) {
            console.error(`Failed to fetch recommendations for product: ${productCode}`);
            throw error;
        }
    }

}

export const recommendationsStore = new RecommendationsStore();