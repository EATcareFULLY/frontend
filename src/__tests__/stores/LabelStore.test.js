import { labelStore } from "../../stores/LabelStore";
import ApiService from "../../services/ApiService";

jest.mock("../../services/ApiService", () => ({
    analyzeLabelImg: jest.fn(),
    analyzeLabelText: jest.fn(),
}));

const mockDescription = "Test description";
const mockImage = "data:image/jpeg;base64,testbase64data";
const mockText = "Test label text";
const mockAnalysis = "Test Analysis Result";

describe("LabelStore", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it("should initialize store with default values when there is no data in localStorage", () => {
        expect(labelStore.labelImg).toBe(null);
        expect(labelStore.labelText).toBe(null);
        expect(labelStore.labelAnalysis).toBe(null);
    });

    it("should convert base64 string to Blob", () => {
        const blob = labelStore.base64ToBlob(mockImage);

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe("image/jpeg");
    });

    it("should set label image, reset text, and save it to localStorage", () => {
        labelStore.setLabelImg(mockImage);

        expect(labelStore.labelImg).toBe(mockImage);
        expect(labelStore.labelText).toBe(null);
        expect(localStorage.getItem("labelImg")).toBe(mockImage);
    });

    it("should set label text, reset image, and save it to localStorage", () => {
        labelStore.setLabelText(mockText);

        expect(labelStore.labelText).toBe(mockText);
        expect(labelStore.labelImg).toBe(null);
        expect(localStorage.getItem("labelText")).toBe(mockText);
    });

    it("should reset label image and remove it from localStorage", () => {
        labelStore.setLabelImg(mockImage);
        labelStore.resetLabelImg();

        expect(labelStore.labelImg).toBe(null);
        expect(localStorage.getItem("labelImg")).toBe(null);
    });

    it("should reset label text and remove it from localStorage", () => {
        labelStore.setLabelText(mockText);
        labelStore.resetLabelText();

        expect(labelStore.labelText).toBe(null);
        expect(localStorage.getItem("labelText")).toBe(null);
    });

    it("should reset label description", () => {
        labelStore.setLabelDescription(mockDescription);
        labelStore.resetLabelDescription();

        expect(labelStore.labelAnalysis).toBe(null);
    });

    it("should analyze label from image and update label description", async () => {
        jest.spyOn(ApiService, "analyzeLabelImg").mockResolvedValue(mockAnalysis);

        labelStore.setLabelImg(mockImage);
        await labelStore.analyzeLabel();

        expect(ApiService.analyzeLabelImg).toHaveBeenCalledWith(expect.any(Blob));
        expect(labelStore.labelAnalysis).toBe(mockAnalysis);
    });

    it("should analyze label from text and update label description", async () => {
        jest.spyOn(ApiService, "analyzeLabelText").mockResolvedValue(mockAnalysis);

        labelStore.setLabelText(mockText);
        await labelStore.analyzeLabel();

        expect(ApiService.analyzeLabelText).toHaveBeenCalledWith(mockText);
        expect(labelStore.labelAnalysis).toBe(mockAnalysis);
    });

    it("should throw an error if image analysis fails", async () => {
        const mockError = new Error("Image analysis failed");
        jest.spyOn(ApiService, "analyzeLabelImg").mockRejectedValue(mockError);

        labelStore.setLabelImg(mockImage);

        await expect(labelStore.analyzeLabel()).rejects.toThrow("Image analysis failed");
        expect(labelStore.labelAnalysis).toBe(null); // Ensure no description is set
    });

    it("should throw an error if text analysis fails", async () => {
        const mockError = new Error("Text analysis failed");
        jest.spyOn(ApiService, "analyzeLabelText").mockRejectedValue(mockError);

        labelStore.setLabelText(mockText);

        await expect(labelStore.analyzeLabel()).rejects.toThrow("Text analysis failed");
        expect(labelStore.labelAnalysis).toBe(null); // Ensure no description is set
    });


});
