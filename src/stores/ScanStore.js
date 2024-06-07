import { makeAutoObservable} from "mobx";


class ScanStore {
    productCode = '';

    constructor() {
        makeAutoObservable(this);
    }

    setProductCode(productCode) {
        this.productCode=productCode;
        console.log('store', this.productCode)
    }


}

export const scanStore = new ScanStore();