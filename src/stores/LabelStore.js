import { makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";


class LabelStore {
    labelImg = null;
    labelDescription = '';


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
    }


    async analyzeLabelFromImage() {
        // Ensure blob is in a supported format (JPEG or PNG)
        const imageBlob = this.base64ToBlob(this.labelImg, 'image/jpeg');
        console.log(`Blob size: ${imageBlob.size}, type: ${imageBlob.type}`);

        // Upload blob to backend
        this.labelDescription = await ApiService.analyzeLabelImg(imageBlob);
    }



}

export const labelStore = new LabelStore();