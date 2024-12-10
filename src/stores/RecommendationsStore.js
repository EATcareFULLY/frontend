import { makeAutoObservable } from "mobx";
import ApiService from "../services/ApiService";
import { historyStore } from "./HistoryStore";
import nutri_a from '../assets/nutri-score/nutri-score-a.png';
import nutri_b from '../assets/nutri-score/nutri-score-b.png';
import nutri_c from '../assets/nutri-score/nutri-score-c.png';
import nutri_d from '../assets/nutri-score/nutri-score-d.png';
import nutri_e from '../assets/nutri-score/nutri-score-e.png';
import nutri_unknown from '../assets/nutri-score/nutri-score-unknown.png';

export class RecommendedProduct{
    constructor(recommendation_data, nutriScoreImage) {
        this.id = recommendation_data['code'];
        this.name = recommendation_data['name'];
        this.nutriscore = recommendation_data['nutriscore'];
        this.imageURL = recommendation_data['image_url'];
        this.nutriScoreImage = nutriScoreImage;
    }
}


const scoreImages = {
    'A': nutri_a,
    'B': nutri_b,
    'C': nutri_c,
    'D': nutri_d,
    'E': nutri_e,
    'unknown': nutri_unknown
};



export default RecommendedProduct;

class RecommendationsStore {
    productRecommendationsData = [];
    recommendations = [];


    constructor() {
        makeAutoObservable(this);
    }

    setRecommendations(recommendations) {
        this.recommendations = recommendations;
    }

    setProductRecommendationsData(productRecommendationsData) {
        this.productRecommendationsData=productRecommendationsData;
        console.log('currentProductsRecommendations', this.productRecommendationsData);
    }


    transformIntoRecommendedProducts()
    {
        return this.recommendations.map((recommendation) => {
            return new RecommendedProduct(recommendation, scoreImages[recommendation.nutriscore]);
        });
    }

    getSourceProduct()
    {
        const sourcePurchase = historyStore.history.find(purchase => purchase.product.id === this.productRecommendationsData['source_product_code']);
        // Then transform that single product if found
        const product = sourcePurchase ? {
            ...sourcePurchase.product,
            nutriScoreImage: scoreImages[sourcePurchase.product.score.toUpperCase() || 'unknown']
        } : null;

        return product
    }


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

            console.log('Successfully fetched recommendations:', result);
            this.setProductRecommendationsData(result);
            console.log('currentProductsRecommendations', this.productRecommendationsData);
            this.setRecommendations(result['recommendations']);
            this.recommendations = this.transformIntoRecommendedProducts();
            console.log('recommendations', this.recommendations);
            return result;

        } catch (error) {
            // Handle any unexpected errors
            console.error('Unexpected error in fetchRecommendations:', error);
            return [];
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
}

export const recommendationsStore = new RecommendationsStore();