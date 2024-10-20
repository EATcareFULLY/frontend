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



describe('ScanStore', () => {
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

    it('should sort products ingridients', () => {
        let product = getMockProduct();
        product.ingredients = getMockUnsortedProductList();

        product = scanStore.sortIngredientsOfProduct(product);

        expect(product).toEqual(getMockProduct());
    });

    it('should get product code from storage if scannedProductCode is empty', async () => {
        localStorage.setItem('scannedProductCode', '11111111');
        jest.spyOn(ApiService, 'getScannedProduct').mockResolvedValue(null);

        await scanStore.getScannedProduct();

        expect(scanStore.scannedProductCode).toBe('11111111');
    });

    it('should reset scanned product', () => {
        scanStore.scannedProduct = getMockProduct();
        scanStore.resetScannedProduct();

        expect(scanStore.scannedProduct).toBeNull();
    });

    it('should add scanned product to purchase', async () => {
        const quantity = 2;
        scanStore.scannedProduct = getMockProduct();
        const spyAddProduct = jest.spyOn(ApiService, 'addProductToPurchased').mockImplementation();

        await scanStore.addScannedProductToPurchase(quantity);

        expect(spyAddProduct).toHaveBeenCalledWith(scanStore.scannedProduct.id, quantity);
    });

    it('should fetch test product', async () => {
        jest.spyOn(ApiService, 'getTestProduct').mockResolvedValue(getMockProduct());

        await scanStore.getTestProduct();

        expect(scanStore.scannedProduct).toEqual(getMockProduct());
    });
});
