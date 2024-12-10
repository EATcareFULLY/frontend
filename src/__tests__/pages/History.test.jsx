import React from "react";
import { historyStore } from "../../stores/HistoryStore";
import History from "../../pages/History";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ConnectionContext } from '../../utils/ConnectionContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();

describe('History Component', () => {
    const mockGroupedHistory = {
        '2024-01': [
            {
                product: {
                    id: 1,
                    name: 'Product A',
                    brand: 'Brand A',
                    imageURL: '',
                    score: 'a',
                },
                quantity: 2,
                purchaseDate: '2024-01-01T00:00:00Z',
            },
        ],
        '2024-02': [
            {
                product: {
                    id: 2,
                    name: 'Product B',
                    brand: 'Brand B',
                    imageURL: '',
                    score: 'b',
                },
                quantity: 1,
                purchaseDate: '2024-02-01T00:00:00Z',
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
        jest.spyOn(historyStore, 'getProductsGroupedByMonth').mockReturnValue(mockGroupedHistory);
        jest.spyOn(historyStore, 'fetchAllPurchases').mockResolvedValue();
    });

    const renderWithContext = (ui, contextValue = { connected: true, setConnected: jest.fn() }) => {
        return render(
            <ConnectionContext.Provider value={contextValue}>
                <MemoryRouter>{ui}</MemoryRouter>
            </ConnectionContext.Provider>
        );
    };

    test('renders grouped purchases correctly', async () => {
        renderWithContext(<History />);

        expect(await screen.findByText(/Purchase List/)).toBeInTheDocument();

        Object.keys(mockGroupedHistory).forEach((yearMonth) => {

            mockGroupedHistory[yearMonth].forEach((purchase) => {
                expect(screen.getByText(purchase.product.name)).toBeInTheDocument();
                expect(screen.getByText(`Brand: ${purchase.product.brand}`)).toBeInTheDocument();
            });
        });
    });

    test('navigates to analytics page on button click', () => {
        renderWithContext(<History />);

        const analyticsButton = screen.getByText(/General Analytics/);
        fireEvent.click(analyticsButton);

        expect(mockNavigate).toHaveBeenCalledWith('/Analyze');
    });

    test('displays recommendation modal when button is clicked', () => {
        renderWithContext(<History />);

        const recommendationButton = screen.getByText(/Today's Recommendations/);
        fireEvent.click(recommendationButton);

        expect(screen.getByText(/Recommended Products/i)).toBeInTheDocument();
    });

    test('disables buttons when disconnected', () => {
        renderWithContext(<History />, { connected: false, setConnected: jest.fn() });

        const reportButton = screen.getAllByTestId('report-button-2024-01')[0]

        expect(reportButton).toBeDisabled();
    });
});
