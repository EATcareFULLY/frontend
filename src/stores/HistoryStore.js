import {makeAutoObservable, toJS} from "mobx";
import ApiService from "../services/ApiService";

class HistoryStore {
    history = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllPurchases() {
        try {
            const products = await ApiService.getTestPurchases();
            this.setHistory(products);
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

    getAverageScore() {
        const scoreMap = {
            'A': 4,
            'B': 3,
            'C': 2,
            'D': 1
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
        const tagCategories = {
            'Organic': 0,
            'Vegan': 0,
            'Gluten-Free': 0,
            'Non-GMO': 0,
            'Low Sugar': 0
        };

        this.history.forEach(purchase => {
            const productTags = toJS(purchase.product.tags);
            productTags.forEach(tag => {
                if (tagCategories[tag.name] !== undefined) {
                    tagCategories[tag.name]++;
                }
            });
        });

        const totalPurchases = this.history.length;
        const tagPercentages = {};
        Object.keys(tagCategories).forEach(tag => {
            tagPercentages[tag] = (tagCategories[tag] / totalPurchases) * 100;
        });

        return tagPercentages;
    }
}

export const historyStore = new HistoryStore();
