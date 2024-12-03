import {scanStore} from "../../stores/ScanStore";
import ApiService from "../../services/ApiService";

const getMockProduct = () => {
    return {
        imageURL: "www.image.pl",
        id:"11111111",
        name:"Mock Product",
        brand:"Mocks",
        score:"a",
        tags: [
            {
                id: 1,
                name: "Tag 1"
            },
            {
                id: 2,
                name: "Tag 2"
            }
        ],
        allergens:[
            {
                id: 1,
                name: "Allergen 1"
            },
            {
                id: 2,
                name: "Allergen 2"
            }
        ],
        ingredients: [
            {
                id: 1,
                name: "Ingridient 1",
                description: "Description",
                content: 20.5
            },
            {
                id: 2,
                name: "Ingridient 2",
                description: "Description",
                content: 10.0
            },
            {
                id: 3,
                name: "Ingridient 3",
                description: "Description",
                content: 7.0
            },
            {
                id: 4,
                name: "Ingridient 4",
                description: "Description",
                content: 5.0
            }
        ]
    }
}

const getMockUnsortedProductList = () => {
    return [
            {
                id: 3,
                name: "Ingridient 3",
                description: "Description",
                content: 7.0
            },
            {
                id: 2,
                name: "Ingridient 2",
                description: "Description",
                content: 10.0
            },
            {
                id: 4,
                name: "Ingridient 4",
                description: "Description",
                content: 5.0
            },
            {
                id: 1,
                name: "Ingridient 1",
                description: "Description",
                content: 20.5
            }
        ]

}



describe('ScanStore with achievements processing', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        scanStore.scannedProductCode = '';
        scanStore.scannedProduct = null;
        localStorage.clear();
    });

    it('should set product code and store it in localStorage', () => {
        const productCode = '12345678';
        scanStore.setProductCode(productCode);

        expect(scanStore.scannedProductCode).toBe(productCode);
        expect(localStorage.getItem('scannedProductCode')).toBe(productCode);
    });

    it('should get product code from localStorage', () => {
        const storedCode = '87654321';
        localStorage.setItem('scannedProductCode', storedCode);

        scanStore.getProductCodeFromStorage();

        expect(scanStore.scannedProductCode).toBe(storedCode);
    });

    it('should default to "00000000" if no product code in localStorage', () => {
        scanStore.getProductCodeFromStorage();

        expect(scanStore.scannedProductCode).toBe('00000000');
    });

    it('should call ApiService to fetch scanned product', async () => {
        jest.spyOn(ApiService, 'getScannedProduct').mockResolvedValue(getMockProduct());

        await scanStore.getScannedProduct();

        expect(ApiService.getScannedProduct).toHaveBeenCalledWith(scanStore.scannedProductCode);
        expect(scanStore.scannedProduct).toEqual(getMockProduct());
    });

    it('should sort product ingredients', () => {
        let product = getMockProduct();
        product.ingredients = getMockUnsortedProductList();

        product = scanStore.sortIngredientsOfProduct(product);

        expect(product.ingredients).toEqual(getMockProduct().ingredients);
    });

    it('should reset scanned product', () => {
        scanStore.scannedProduct = getMockProduct();
        scanStore.resetScannedProduct();

        expect(scanStore.scannedProduct).toBeNull();
    });

    it('should add scanned product to purchase and process achievements', async () => {
        const quantity = 2;
        const mockAchievements = ['Achievement 1', 'Achievement 2'];
        jest.spyOn(ApiService, 'addProductToPurchased').mockResolvedValue({
            unlockedAchievements: mockAchievements,
        });

        scanStore.scannedProduct = getMockProduct();
        const achievements = await scanStore.addScannedProductToPurchase(quantity);

        expect(ApiService.addProductToPurchased).toHaveBeenCalledWith(scanStore.scannedProduct.id, quantity);
        expect(achievements).toEqual(mockAchievements);
    });

    it('should return null if no achievements are unlocked', async () => {
        const quantity = 2;
        jest.spyOn(ApiService, 'addProductToPurchased').mockResolvedValue({ unlockedAchievements: null });

        scanStore.scannedProduct = getMockProduct();
        const achievements = await scanStore.addScannedProductToPurchase(quantity);

        expect(achievements).toBeNull();
    });

    it('should fetch test product', async () => {
        jest.spyOn(ApiService, 'getTestProduct').mockResolvedValue(getMockProduct());

        await scanStore.getTestProduct();

        expect(scanStore.scannedProduct).toEqual(getMockProduct());
    });
});
