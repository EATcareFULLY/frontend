import {makeAutoObservable} from "mobx";
import ApiService from "../services/ApiService";


class LabelStore {
    labelImg = localStorage.getItem('labelImg') || null;
    labelText = localStorage.getItem('labelText') || null;
    labelAnalysis = null;


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
        this.resetLabelText();
        this.labelImg=image;
        localStorage.setItem('labelImg', image);
    }

    setLabelText(label) {
        this.resetLabelImg();
        this.labelText=label;
        localStorage.setItem('labelText', label);
    }

    setLabelDescription(description) {
        this.labelAnalysis = description;
    }

    resetLabelImg() {
        localStorage.removeItem('labelImg');
        this.labelImg = null;
    }

    resetLabelText() {
        localStorage.removeItem('labelText');
        this.labelText = null;
    }

    resetLabelDescription() {
        this.labelAnalysis = null;
    }

    async analyzeLabel() {
        this.resetLabelDescription();

        try {
            let analysis;

            if (this.labelImg) {
                analysis = await this.analyzeLabelFromImage();
            } else {
                analysis = await this.analyzeLabelFromText();
            }

            // console.log("label analysis", analysis);
            this.setLabelDescription(analysis);
        } catch (error) {
            throw error;
        }
    }

    async analyzeLabelFromText() {
        // console.log("label text", this.labelText);
        // console.log("label image", this.labelImg);

        try {
            return await ApiService.analyzeLabelText(this.labelText);
        } catch (error) {
            throw error;
        }
    }

    async analyzeLabelFromImage() {
        // console.log("label text", this.labelText);
        // console.log("label image", this.labelImg);

        const imageBlob = this.base64ToBlob(this.labelImg, 'image/jpeg');
        // console.log(`Blob size: ${imageBlob.size}, type: ${imageBlob.type}`);

        try {
            return  await ApiService.analyzeLabelImg(imageBlob);
        } catch (error) {
            throw error;
        }

    }


}

export const labelStore = new LabelStore();