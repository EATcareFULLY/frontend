import { labelStore } from '../../stores/LabelStore';
import ApiService from '../../services/ApiService';

jest.mock('../../services/ApiService', () => ({
    analyzeLabelImg: jest.fn(),
}));

const mockDescription = 'Test description';
const mockImage = 'data:image/jpeg;base64,testbase64data';
const mockAnalysis = 'Test Analysis Result';

describe('LabelStore', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should initialize store with default values when there is no data in localStorage', () => {

        expect(labelStore.labelImg).toBe(null);
        expect(labelStore.labelAnalysis).toBe('');
    });

    it('should convert base64 string to Blob', () => {
        const blob = labelStore.base64ToBlob(mockImage);

        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe('image/jpeg');
    });

    it('should set label image and save it to localStorage', () => {
        labelStore.setLabelImg(mockImage);

        expect(labelStore.labelImg).toBe(mockImage);
        expect(localStorage.getItem('labelImg')).toBe(mockImage);
    });

    it('should set label description and save it to localStorage', () => {
        labelStore.setLabelDescription(mockDescription);

        expect(labelStore.labelAnalysis).toBe(mockDescription);
        expect(localStorage.getItem('labelDescription')).toBe(mockDescription);
    });

    it('should set default label description and remove it from localStorage', () => {
        labelStore.resetLabelDescription();

        expect(labelStore.labelAnalysis).toBe('');
        expect(localStorage.getItem('labelDescription')).toBe(null);
    });

    it('should analyze label from image and update label description', async () => {

        jest.spyOn(ApiService, 'analyzeLabelImg').mockResolvedValue(mockAnalysis);
        jest.spyOn(labelStore, 'resetLabelDescription');

        labelStore.setLabelImg(mockImage);

        await labelStore.analyzeLabelFromImage();

        expect(labelStore.resetLabelDescription).toHaveBeenCalled();
        expect(ApiService.analyzeLabelImg).toHaveBeenCalledWith(expect.any(Blob));
        expect(labelStore.labelAnalysis).toBe(mockAnalysis);
    });

    it('should analyze new label from image and update label description', async () => {

        jest.spyOn(labelStore, 'analyzeLabelFromImage').mockResolvedValue(mockAnalysis);

        await labelStore.analyzeNewLabelFromImage(mockImage);

        expect(labelStore.labelImg).toBe(mockImage);
        expect(labelStore.analyzeLabelFromImage).toHaveBeenCalled();
    });


});
