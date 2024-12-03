import {makeAutoObservable, toJS} from "mobx";
import ApiService from "../services/ApiService";

class HistoryStore {
    history = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllPurchases() {
        try {
            const purchases = await ApiService.getPurchases();
            this.setHistory(
                purchases.flatMap(purchase =>
                    purchase.purchaseItems.map(item => ({
                        ...item,
                        purchaseDate: purchase.purchaseDate
                    }))
                )
            );
            console.log('history state',purchases.flatMap(purchase => purchase.purchaseItems).length);
        } catch (error) {
            console.error("Failed to fetch purchases");
        }
    }
    async fetchAllTestPurchases() {
        try {
            const purchases = await ApiService.getTestPurchases();
            this.setHistory(purchases.flatMap(purchase => purchase.purchaseItems));
            console.log('size',purchases.flatMap(purchase => purchase.purchaseItems).length);
        } catch (error) {
            console.error("Failed to fetch purchases");
        }
    }

    setHistory(products) {
        this.history = products;
    }

    getTotalSpent() {
        return this.history.reduce((total, purchase) => total + purchase.quantity, 0);
    }

    getMostFrequentProduct() {
        const mostFrequentProduct = this.history
            .reduce((acc, purchase) => {
                const name = purchase.product.name;
                acc[name] = acc[name] ? acc[name] + purchase.quantity : purchase.quantity;
                return acc;
            }, {});
        const productNames = Object.keys(mostFrequentProduct);
        const mostFrequentProductName = productNames.reduce((a, b) => mostFrequentProduct[a] > mostFrequentProduct[b] ? a : b, productNames[0]);
        return { mostFrequentProduct, mostFrequentProductName };
    }

    getMostFrequentBrand() {
        const mostFrequentBrand = this.history
            .reduce((acc, purchase) => {
                const brand = purchase.product.brand;
                acc[brand] = acc[brand] ? acc[brand] + purchase.quantity : purchase.quantity;
                return acc;
            }, {});
        const brandNames = Object.keys(mostFrequentBrand);
        return brandNames.reduce((a, b) => mostFrequentBrand[a] > mostFrequentBrand[b] ? a : b, brandNames[0]);
    }

    getSortedBrands() {
        const brandCounts = this.history.reduce((acc, purchase) => {
            const brand = purchase.product.brand;
            acc[brand] = acc[brand] ? acc[brand] + purchase.quantity : purchase.quantity;
            return acc;
        }, {});

        const sortedBrands = Object.entries(brandCounts)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10); // Pobieramy top 10

        return sortedBrands;
    }
    getTopIngredients() {
        const ingredientCounts = {};

        this.history.forEach(purchase => {
            purchase.product.ingredients.forEach(ingredient => {
                const ingredientName = ingredient.name;
                ingredientCounts[ingredientName] = (ingredientCounts[ingredientName] || 0) + 1;
            });
        });

        const sortedIngredients = Object.entries(ingredientCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        return sortedIngredients.map(([name, count]) => ({ name, count }));
    }


    getAverageScore() {
        const scoreMap = {
            'a': 5,
            'b': 4,
            'c': 3,
            'd': 2,
            'e': 1,
            'unknown': 1
        };

        const totalScore = this.history
            .reduce((total, purchase) => total + (scoreMap[purchase.product.score] || 0), 0);

        const averageScoreNumeric = totalScore / this.history.length;



        return this.numericToLetterScore(averageScoreNumeric);
    }
    numericToLetterScore(averageScore)  {
        if (averageScore >= 3.5) {
            return 'A';
        } else if (averageScore >= 2.5) {
            return 'B';
        } else if (averageScore >= 1.5) {
            return 'C';
        } else {
            return 'D';
        }
    };

    getScoreCount() {
        console.log("score store", this.history.map(a => a.product.score));
        return this.history.reduce((acc, purchase) => {
            const score = purchase.product.score;
            acc[score] = acc[score] ? acc[score] + 1 : 1;
            return acc;
        }, {});
    }

    getSortedProducts() {
        const mostFrequentProduct = this.getMostFrequentProduct().mostFrequentProduct;
        const productNames = Object.keys(mostFrequentProduct);

        return productNames
            .map(name => ({ name, quantity: mostFrequentProduct[name] }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);
    }

    getTagStatistics() {
        const tagCounts = {};

        this.history.forEach(purchase => {
            const productTags = toJS(purchase.product.tags);
            productTags.forEach(tag => {
                const tagName = tag.name;
                if (tagCounts[tagName]) {
                    tagCounts[tagName]++;
                } else {
                    tagCounts[tagName] = 1;
                }
            });
        });

        const sortedTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const totalTopTagsCount = sortedTags.reduce((total, [, count]) => total + count, 0);

        const tagPercentages = {};
        sortedTags.forEach(([tag, count]) => {
            tagPercentages[tag] = ((count / totalTopTagsCount) * 100).toFixed(2); // Zaokrąglenie do 2 miejsc po przecinku
        });

        return tagPercentages;
    }

    getProductsGroupedByMonth() {
        return this.history.reduce((grouped, purchase) => {
            const date = new Date(purchase.purchaseDate);
            const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!grouped[yearMonth]) {
                grouped[yearMonth] = [];
            }

            grouped[yearMonth].push(purchase);
            return grouped;
        }, {});
    }

}

export const historyStore = new HistoryStore();
