import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyGroup from '../../components/MonthlyGroup';
import ApiService from '../../services/ApiService';
import { ConnectionContext } from '../../utils/ConnectionContext';

jest.mock('../../services/ApiService');

describe('MonthlyGroup Component', () => {
    const mockPurchases = [
        {
            product: {
                id: 1,
                name: 'Product A',
                brand: 'Brand A',
                imageURL: '',
                score: 'A',
            },
            quantity: 2,
            purchaseDate: '2024-01-01T00:00:00Z',
        },
        {
            product: {
                id: 2,
                name: 'Product B',
                brand: 'Brand B',
                imageURL: '',
                score: 'B',
            },
            quantity: 3,
            purchaseDate: '2024-01-02T00:00:00Z',
        },
    ];

    const mockScoreImages = {
        A: 'path/to/score-a.png',
        B: 'path/to/score-b.png',
        unknown: 'path/to/unknown.png',
    };

    const mockShowDetails = jest.fn();

    const mockFormatMonth = jest.fn(yearMonthString => "January 2024");

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the component with purchases and handles rendering logic', () => {
        render(
            <ConnectionContext.Provider value={{ connected: true }}>
                <MonthlyGroup
                    yearMonthString="January 2024"
                    yearMonth={{ month: 1, year: 2024 }}
                    purchases={mockPurchases}
                    monthIcon={<span>📅</span>}
                    formatMonth={mockFormatMonth}
                    scoreImages={mockScoreImages}
                    showDetails={mockShowDetails}
                />
            </ConnectionContext.Provider>
        );


        mockPurchases.forEach((purchase) => {
            expect(screen.getByText(purchase.product.name)).toBeInTheDocument();
            expect(screen.getByText(`Brand: ${purchase.product.brand}`)).toBeInTheDocument();
            expect(screen.getByText(`Quantity: ${purchase.quantity}`)).toBeInTheDocument();
            expect(
                screen.getByText(
                    new Date(purchase.purchaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                    })
                )
            ).toBeInTheDocument();
        });

        expect(screen.getAllByAltText('Nutri-Score')).toHaveLength(mockPurchases.length);
    });

    test('handles PDF generation click', async () => {
        ApiService.generatePdfReport.mockResolvedValueOnce();

        render(
            <ConnectionContext.Provider value={{ connected: true }}>
                <MonthlyGroup
                    yearMonthString="January 2024"
                    yearMonth={{ month: 1, year: 2024 }}
                    purchases={mockPurchases}
                    monthIcon={<span>📅</span>}
                    formatMonth={mockFormatMonth}
                    scoreImages={mockScoreImages}
                    showDetails={mockShowDetails}
                />
            </ConnectionContext.Provider>
        );

        const pdfButton = screen.getByTestId('report-button-January 2024');
        fireEvent.click(pdfButton);

        expect(ApiService.generatePdfReport).toHaveBeenCalledWith(
            1,
            2024,
            expect.any(Function),
            expect.any(Function)
        );
    });

    test('disables PDF button when disconnected', () => {
        render(
            <ConnectionContext.Provider value={{ connected: false }}>
                <MonthlyGroup
                    yearMonthString="January 2024"
                    yearMonth={{ month: 1, year: 2024 }}
                    purchases={mockPurchases}
                    monthIcon={<span>📅</span>}
                    formatMonth={mockFormatMonth}
                    scoreImages={mockScoreImages}
                    showDetails={mockShowDetails}
                />
            </ConnectionContext.Provider>
        );

        const pdfButton = screen.getByTestId('report-button-January 2024');
        expect(pdfButton).toBeDisabled();
        fireEvent.click(pdfButton);
        expect(ApiService.generatePdfReport).not.toHaveBeenCalled();
    });

    test('triggers showDetails when purchase is clicked', () => {
        const mockShowDetails = jest.fn();
        render(
            <ConnectionContext.Provider value={{ connected: true }}>
                <MonthlyGroup
                    yearMonthString="January 2024"
                    yearMonth={{ month: 1, year: 2024 }}
                    purchases={mockPurchases}
                    monthIcon={<span>📅</span>}
                    formatMonth={mockFormatMonth}
                    scoreImages={mockScoreImages}
                    showDetails={mockShowDetails}
                />
            </ConnectionContext.Provider>
        );

        const purchaseItems = screen.getAllByTestId('purchase');
        fireEvent.click(purchaseItems[0]);

        expect(mockShowDetails).toHaveBeenCalled();
    });
});
