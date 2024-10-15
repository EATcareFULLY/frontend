import ApiService from "../../services/ApiService";
import {historyStore} from "../../stores/HistoryStore";

const getMockList = () => {
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
            quantity: 0
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
describe('HistoryStore', (object, method) => {
    it('should fetch test products from api', (object, method) => {
        jest.spyOn(ApiService, "getTestPurchases").mockResolvedValue(getMockList())
    })
    historyStore.fetchAllPurchases()
    expect(historyStore.history.length).toBe(1)
})