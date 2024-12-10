import { historyStore } from '../../stores/HistoryStore';
import ApiService from '../../services/ApiService';

jest.mock('../../services/ApiService');

describe('HistoryStore Tests', () => {
    const mockPurchases = [
        {
            id: 1,
            purchaseItems: [
                {
                    product: {
                        id: 1,
                        name: "Product A",
                        score: "C",
                        brand: "Brand A",
                        tags: [
                            { id: 1, name: "Tag1" },
                            { id: 2, name: "Tag2" }
                        ],
                        ingredients: [
                            { id: 1, name: "Ingredient1", content: 20 },
                            { id: 2, name: "Ingredient2", content: 10 }
                        ]
                    },
                    quantity: 2
                }
            ],
            purchaseDate: '2024-10-15T15:50:43.958Z'
        },
        {
            id: 2,
            purchaseItems: [
                {
                    product: {
                        id: 2,
                        name: "Product B",
                        score: "B",
                        brand: "Brand B",
                        tags: [
                            { id: 3, name: "Tag3" }
                        ],
                        ingredients: [
                            { id: 3, name: "Ingredient3", content: 5 }
                        ]
                    },
                    quantity: 1
                }
            ],
            purchaseDate: '2024-10-15T15:50:43.958Z'
        }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        historyStore.setHistory([]);
    });

    test('fetches and sets purchases from API', async () => {
        jest.spyOn(ApiService, 'getPurchases').mockResolvedValue(mockPurchases);

        await historyStore.fetchAllPurchases();

        expect(ApiService.getPurchases).toHaveBeenCalled();
        expect(historyStore.history.length).toBe(2);
        expect(historyStore.history[0].product.name).toBe("Product A");
        expect(historyStore.history[1].product.name).toBe("Product B");
    });

    test('handles API errors gracefully during fetch', async () => {
        ApiService.getPurchases.mockRejectedValue(new Error('API Error'));
        jest.spyOn(console, 'error').mockImplementation(() => {});

        await historyStore.fetchAllPurchases();

        expect(historyStore.history.length).toBe(0);
        expect(console.error).toHaveBeenCalledWith("Failed to fetch purchases", expect.any(Error));
    });

    test('calculates total spent correctly', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const totalSpent = historyStore.getTotalSpent();
        expect(totalSpent).toBe(3);
    });

    test('identifies the most frequent product', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const { mostFrequentProductName } = historyStore.getMostFrequentProduct();
        expect(mostFrequentProductName).toBe('Product A');
    });

    test('calculates average score correctly', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const averageScore = historyStore.getAverageScore();
        expect(averageScore).toBe('D');
    });

    test('returns correct score count', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const scoreCount = historyStore.getScoreCount();
        expect(scoreCount.C).toBe(1);
        expect(scoreCount.B).toBe(1);
    });

    test('groups purchases by month', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const groupedHistory = historyStore.getProductsGroupedByMonth();
        expect(Object.keys(groupedHistory).length).toBe(1);
        expect(groupedHistory['2024-10'].length).toBe(2);
    });

    test('returns sorted products by frequency', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const sortedProducts = historyStore.getSortedProducts();
        expect(sortedProducts.length).toBe(2);
        expect(sortedProducts[0].name).toBe('Product A');
    });

    test('calculates tag statistics correctly', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const tagStatistics = historyStore.getTagStatistics();
        expect(tagStatistics.Tag1).toBe('33.33');
        expect(tagStatistics.Tag2).toBe('33.33');
        expect(tagStatistics.Tag3).toBe('33.33');
    });

    test('returns sorted brands by frequency', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const sortedBrands = historyStore.getSortedBrands();
        expect(sortedBrands.length).toBe(2);
        expect(sortedBrands[0].name).toBe('Brand A');
    });

    test('returns top ingredients', () => {
        historyStore.setHistory(mockPurchases.flatMap(p => p.purchaseItems.map(item => ({
            ...item,
            purchaseDate: p.purchaseDate
        }))));

        const topIngredients = historyStore.getTopIngredients();
        expect(topIngredients.length).toBe(3);
        expect(topIngredients[0].name).toBe('Ingredient1');
    });

    test('returns numeric to letter score', () => {
        expect(historyStore.numericToLetterScore(4.5)).toBe('A');
        expect(historyStore.numericToLetterScore(3.0)).toBe('B');
        expect(historyStore.numericToLetterScore(2.0)).toBe('C');
        expect(historyStore.numericToLetterScore(1.0)).toBe('D');
    });
});
