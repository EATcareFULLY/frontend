import ApiService from "../../services/ApiService";
import {historyStore} from "../../stores/HistoryStore";

export const getMockList = () => {
    return [
        {
            id: 0,
            username: "user",
            product: {
                id: 1,
                name: "Ketchup",
                score: "C",
                brand: "Brand",
                imageURL: null,
                tags: [
                    {
                        id: 1,
                        name: "Organic"
                    },
                    {
                        id: 2,
                        name: "Vegan"
                    }
                ],
                ingredients: [
                    {
                        id: 1,
                        name: "Tomato Paste",
                        description: "Concentrated tomato paste",
                        content: 20.5
                    },
                    {
                        id: 2,
                        name: "Sugar",
                        description: "White granulated sugar",
                        content: 10.0
                    },
                    {
                        id: 3,
                        name: "Salt",
                        description: "Table salt",
                        content: 5.0
                    },
                    {
                        id: 4,
                        name: "Vinegar",
                        description: "Distilled white vinegar",
                        content: 7.0
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 1
        },
        {
            id: 1,
            username: "user",
            product: {
                id: 2,
                name: "Mustard French",
                score: "B",
                brand: "Brand",
                imageURL: null,
                tags: [
                    {
                        id: 3,
                        name: "Gluten-Free"
                    },
                    {
                        id: 4,
                        name: "Non-GMO"
                    }
                ],
                ingredients: [
                    {
                        id: 5,
                        name: "Spices",
                        description: "Mixed spices",
                        content: 1.5
                    },
                    {
                        id: 6,
                        name: "Water",
                        description: "Filtered water",
                        content: 50.0
                    },
                    {
                        id: 7,
                        name: "Garlic",
                        description: "Minced garlic",
                        content: 2.0
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 1
        },
        {
            id: 2,
            username: "user",
            product: {
                id: 3,
                name: "Mayonnaise Light",
                score: "A",
                brand: "Brand",
                imageURL: null,
                tags: [
                    {
                        id: 5,
                        name: "Low Sugar"
                    },
                    {
                        id: 2,
                        name: "Vegan"
                    }
                ],
                ingredients: [
                    {
                        id: 8,
                        name: "Onion",
                        description: "Diced onion",
                        content: 3.0
                    },
                    {
                        id: 9,
                        name: "Oil",
                        description: "Vegetable oil",
                        content: 4.0
                    },
                    {
                        id: 10,
                        name: "Lemon Juice",
                        description: "Fresh lemon juice",
                        content: 2.5
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 2
        }
    ];
}

const getMockListNoTags = () => {
    return [
        {
            id: 0,
            username: "user",
            product: {
                id: 1,
                name: "Ketchup",
                score: "C",
                brand: "Brand",
                imageURL: null,
                tags: [
                ],
                ingredients: [
                    {
                        id: 1,
                        name: "Tomato Paste",
                        description: "Concentrated tomato paste",
                        content: 20.5
                    },
                    {
                        id: 2,
                        name: "Sugar",
                        description: "White granulated sugar",
                        content: 10.0
                    },
                    {
                        id: 3,
                        name: "Salt",
                        description: "Table salt",
                        content: 5.0
                    },
                    {
                        id: 4,
                        name: "Vinegar",
                        description: "Distilled white vinegar",
                        content: 7.0
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 1
        },
        {
            id: 1,
            username: "user",
            product: {
                id: 2,
                name: "Mustard French",
                score: "B",
                brand: "Brand",
                imageURL: null,
                tags: [

                ],
                ingredients: [
                    {
                        id: 5,
                        name: "Spices",
                        description: "Mixed spices",
                        content: 1.5
                    },
                    {
                        id: 6,
                        name: "Water",
                        description: "Filtered water",
                        content: 50.0
                    },
                    {
                        id: 7,
                        name: "Garlic",
                        description: "Minced garlic",
                        content: 2.0
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 1
        },
        {
            id: 2,
            username: "user",
            product: {
                id: 3,
                name: "Mayonnaise Light",
                score: "A",
                brand: "Brand",
                imageURL: null,
                tags: [

                ],
                ingredients: [
                    {
                        id: 8,
                        name: "Onion",
                        description: "Diced onion",
                        content: 3.0
                    },
                    {
                        id: 9,
                        name: "Oil",
                        description: "Vegetable oil",
                        content: 4.0
                    },
                    {
                        id: 10,
                        name: "Lemon Juice",
                        description: "Fresh lemon juice",
                        content: 2.5
                    }
                ]
            },
            purchaseDate: [2024, 10, 15, 15, 50, 43, 958735300],
            quantity: 2
        }
    ];
}
describe('HistoryStore', () => {
    beforeEach(() => {
        historyStore.history = []
    })
    it('should fetch test products from api', async () => {
        jest.spyOn(ApiService, "getTestPurchases").mockResolvedValue(getMockList());
        await historyStore.fetchAllPurchases();
        expect(historyStore.history.length).toBe(3);
    });
    it("should not fetch products due to an error", async () => {
        jest.spyOn(ApiService, "getTestPurchases").mockRejectedValue(new Error('Network Error'));
        jest.spyOn(console, "error")
        await historyStore.fetchAllPurchases();
        expect(historyStore.history.length).toBe(0);
        expect(console.error).toHaveBeenCalledWith("Failed to fetch purchases");
    })
    it("should set history", () => {
        historyStore.history = getMockList()
        expect(historyStore.history.length).toBe(3);
        historyStore.setHistory([])
        expect(historyStore.history.length).toBe(0);
    })
    it("should count total spent", () => {
        historyStore.history = getMockList()
        const result = historyStore.getTotalSpent()
        expect(result).toBe(4);
    })
    it("should get most frequent product", () => {
        historyStore.history = getMockList()
        const {mostFrequentProduct, mostFrequentProductName} = historyStore.getMostFrequentProduct();
        console.log(mostFrequentProduct);
        console.log(mostFrequentProductName);
        expect(Object.keys(mostFrequentProduct).length).toBe(3);
        expect(mostFrequentProductName).toBe("Mayonnaise Light");
    })
    it("should get most frequent product when no purchases", () => {
        historyStore.history = []
        const {mostFrequentProduct, mostFrequentProductName} = historyStore.getMostFrequentProduct();
        console.log(mostFrequentProduct);
        console.log(mostFrequentProductName);
        expect(Object.keys(mostFrequentProduct).length).toBe(0);
        expect(mostFrequentProductName).toBe(undefined);
    })

    it("should get most frequent brand", () => {
        historyStore.history = getMockList()
        const mostFrequentBrand = historyStore.getMostFrequentBrand()
        expect(mostFrequentBrand).toBe("Brand")
    })
    it("should get average score", () => {
        historyStore.history = getMockList()
        const averageScore = historyStore.getAverageScore();
        expect(averageScore).toBe("B");
    })
    it("should get correct alphabetical score", () => {
        expect(historyStore.numericToLetterScore(3.7)).toBe("A");
        expect(historyStore.numericToLetterScore(2.6)).toBe("B");
        expect(historyStore.numericToLetterScore(1.7)).toBe("C");
        expect(historyStore.numericToLetterScore(0.7)).toBe("D");
    })
    it("should get score count", () => {
        historyStore.history = getMockList()
        const scoreCount = historyStore.getScoreCount();
        expect(scoreCount.A).toBe(1);
        expect(scoreCount.B).toBe(1);
        expect(scoreCount.C).toBe(1);

    })
    it("should get sorted products", () => {
        historyStore.history = getMockList()
        const sortedProducts = historyStore.getSortedProducts();
        expect(sortedProducts.length).toBe(3);
        expect(sortedProducts[0].name).toBe('Mayonnaise Light');
    })
    it("should get tag statistic", () => {
        historyStore.history = getMockList()
        const tags = historyStore.getTagStatistics()
        expect(Math.round(tags.Vegan)).toBe(67);
        expect(Math.round(tags.Organic)).toBe(33);
    })
    it("should get tag statistic when no tags", () => {
        historyStore.history = getMockListNoTags()
        const tags = historyStore.getTagStatistics()
        console.log(tags)
        expect(Math.round(tags.Vegan)).toBe(0);
        expect(Math.round(tags.Organic)).toBe(0);
    })

})