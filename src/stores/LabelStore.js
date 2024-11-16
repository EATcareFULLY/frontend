import { makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";


class LabelStore {
    labelImg = localStorage.getItem('labelImg') || null;
    labelDescription = localStorage.getItem('labelDescription') || '';


    constructor() {
        makeAutoObservable(this);
    }

    base64ToBlob(base64, type = 'image/jpeg') {
        const byteString = atob(base64.split(',')[1]);
        const byteArray = new Uint8Array(byteString.length);

        for (let i = 0; i < byteString.length; i++) {
            byteArray[i] = byteString.charCodeAt(i);
        }

        return new Blob([byteArray], { type });
    }


    setLabelImg(image) {
        this.labelImg=image;
        localStorage.setItem('labelImg', image);
    }

    setLabelDescription(description) {
        this.labelDescription = description;
        localStorage.setItem('labelDescription', description);
    }

    resetLabelDescription() {
        this.labelDescription = '';
        localStorage.removeItem('labelDescription')
    }


    async analyzeNewLabelFromImage(image) {
        this.setLabelImg(image);
        this.analyzeLabelFromImage();
    }

    async analyzeLabelFromImage() {
        this.resetLabelDescription();

        const imageBlob = this.base64ToBlob(this.labelImg, 'image/jpeg');
        console.log(`Blob size: ${imageBlob.size}, type: ${imageBlob.type}`);

        const analysis = await ApiService.analyzeLabelImg(imageBlob);

        this.setLabelDescription(analysis);
    }

}

export const labelStore = new LabelStore();