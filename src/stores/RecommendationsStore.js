import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import StorageManager from "../utils/StorageManager";
import RecommendationError from "../errors/RecommendationError";

export class ProductRecommendation{
constructor(recommendation_data, nutriScoreImage) {
    this.id = recommendation_data['code'];
    this.name = recommendation_data['name'];
    this.nutriscore = recommendation_data['nutriscore'];
    this.imageURL = recommendation_data['image_url'];
    this.nutriScoreImage = nutriScoreImage;
}
}
export default ProductRecommendation;

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
        console.log('Starting recommendations fetch...');
        try {
            const result = await ApiService.getRecommendations();
            
            // Check if we got an error object
            if (result.error) {
                console.error(`Recommendation error (${result.status}):`, result.message);
                
                switch (result.status) {
                    case 404:
                        console.log('No recommendations available, clearing current data');
                        break;
                        
                    case 503:
                        console.log('Service unavailable, attempting to load cached recommendations');
                        
                        break;
                        
                    default:
                        console.error('Unhandled error state:', result);
                }
                return [];
            }
    
            // If we got here, result contains valid recommendations
            console.log('Successfully fetched recommendations:', result);
            this.setCurrentProductsRecommendations(result);
            console.log('Successfully stored recommendations:', result);
            return result;
            
        } catch (error) {
            // Handle any unexpected errors
            console.error('Unexpected error in fetchRecommendations:', error);
            this.showErrorState();
            return [];
        }
    }

    

    // async fetchRecommendations() {
    //     console.log('Starting recommendations fetch...');
    //     try {
    //         const recommendations = await ApiService.getRecommendations();
    //         this.setCurrentProductsRecommendations(recommendations);
    //         console.log('Successfully stored recommendations:', recommendations);
    //         return recommendations;
            
    //     } catch (error) {
    //         const status = error.response?.status || error.status || 0;
    //         console.error(`Recommendation error (${status}):`, error.message);
            
    //         switch (status) {
    //             case 404:
    //                 console.log('No recommendations available, clearing current data');
    //                 this.clearRecommendations();
    //                 this.showUserMessage('No recommendations available today');
    //                 break;
                    
    //             case 503:
    //                 console.log('Service unavailable, attempting to load cached recommendations');
    //                 await this.loadCachedRecommendations();
    //                 this.showUserMessage('Using cached recommendations');
    //                 break;
                    
    //             default:
    //                 console.error('Unhandled error state:', error);
    //                 this.showErrorState();
    //                 this.notifyErrorMonitoring({
    //                     error,
    //                     status,
    //                     message: error.message,
    //                     timestamp: new Date().toISOString()
    //                 });
    //         }
            
    //         throw error;
    //     }
    // }



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
