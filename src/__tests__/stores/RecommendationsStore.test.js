import ApiService from "../../services/ApiService";
import {recommendationsStore} from "../../stores/RecommendationsStore";

jest.mock("../../services/ApiService");

const getMockRecommendations = () => {
    return {
        source_product_code: "123",
        recommendations: [
            {
                code: "456",
                name: "Test Product",
                nutriscore: "A",
                image_url: "test.jpg"
            },
            {
                code: "789",
                name: "Another Product",
                nutriscore: "B",
                image_url: "test2.jpg"
            }
        ]
    };
};

describe("RecommendationsStore", () => {
    beforeEach(() => {
        recommendationsStore.setRecommendations([]);
        recommendationsStore.setProductRecommendationsData([]);
        jest.clearAllMocks();
    });

    it("should set recommendations", () => {
        const mockData = getMockRecommendations();
        recommendationsStore.setRecommendations(mockData.recommendations);
        expect(recommendationsStore.recommendations).toEqual(mockData.recommendations);
    });

    it("should set product recommendations data", () => {
        const mockData = getMockRecommendations();
        recommendationsStore.setProductRecommendationsData(mockData);
        expect(recommendationsStore.productRecommendationsData).toEqual(mockData);
    });

    it("should transform recommendations into RecommendedProduct instances", () => {
        const mockData = getMockRecommendations();
        recommendationsStore.setRecommendations(mockData.recommendations);
        
        const transformed = recommendationsStore.transformIntoRecommendedProducts();
        
        expect(transformed).toHaveLength(2);
        expect(transformed[0].id).toBe("456");
        expect(transformed[0].name).toBe("Test Product");
        expect(transformed[0].nutriscore).toBe("A");
        expect(transformed[1].id).toBe("789");
        expect(transformed[1].name).toBe("Another Product");
        expect(transformed[1].nutriscore).toBe("B");
    });

    it("should fetch recommendations successfully", async () => {
        const mockData = getMockRecommendations();
        ApiService.getRecommendations.mockResolvedValue(mockData);

        await recommendationsStore.fetchRecommendations();

        expect(ApiService.getRecommendations).toHaveBeenCalled();
        expect(recommendationsStore.productRecommendationsData).toEqual(mockData);
        expect(recommendationsStore.recommendations).toHaveLength(2);
    });

    it("should handle 404 error when fetching recommendations", async () => {
        const errorResponse = {
            error: true,
            status: 404,
            message: "Not found"
        };
        ApiService.getRecommendations.mockResolvedValue(errorResponse);

        const result = await recommendationsStore.fetchRecommendations();

        expect(ApiService.getRecommendations).toHaveBeenCalled();
        expect(result).toEqual([]);
        expect(recommendationsStore.recommendations).toEqual([]);
    });

    it("should handle 503 error when fetching recommendations", async () => {
        const errorResponse = {
            error: true,
            status: 503,
            message: "Service unavailable"
        };
        ApiService.getRecommendations.mockResolvedValue(errorResponse);

        const result = await recommendationsStore.fetchRecommendations();

        expect(ApiService.getRecommendations).toHaveBeenCalled();
        expect(result).toEqual([]);
        expect(recommendationsStore.recommendations).toEqual([]);
    });

    it("should handle unexpected error when fetching recommendations", async () => {
        ApiService.getRecommendations.mockRejectedValue(new Error("Unexpected error"));

        const result = await recommendationsStore.fetchRecommendations();

        expect(ApiService.getRecommendations).toHaveBeenCalled();
        expect(result).toEqual([]);
        expect(recommendationsStore.recommendations).toEqual([]);
    });

    it("should get source product from history", () => {
        const mockData = getMockRecommendations();
        recommendationsStore.setProductRecommendationsData(mockData);
        
        // Symulujemy znalezienie produktu w historii
        const sourcePurchase = {
            product: {
                id: "123",
                score: "a",
                name: "Source Product"
            }
        };
        require("../../stores/HistoryStore").historyStore.history = [sourcePurchase];

        const sourceProduct = recommendationsStore.getSourceProduct();
        expect(sourceProduct).toBeTruthy();
        expect(sourceProduct.id).toBe("123");
        expect(sourceProduct.name).toBe("Source Product");
    });

    it("should return null when source product not found in history", () => {
        const mockData = getMockRecommendations();
        recommendationsStore.setProductRecommendationsData(mockData);
        
        // Symulujemy pustą historię
        require("../../stores/HistoryStore").historyStore.history = [];

        const sourceProduct = recommendationsStore.getSourceProduct();
        expect(sourceProduct).toBeNull();
    });
});