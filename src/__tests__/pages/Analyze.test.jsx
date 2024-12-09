import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { historyStore } from '../../stores/HistoryStore';
import Analyze from '../../pages/Analyze';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-chartjs-2', () => ({
    Bar: jest.fn(() => <div data-testid="bar-chart" />),
    Doughnut: jest.fn(() => <div data-testid="doughnut-chart" />),
}));

describe('Analyze Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(historyStore, 'fetchAllPurchases').mockResolvedValue();

        jest.spyOn(historyStore, 'getAverageScore').mockReturnValue('B');

        jest.spyOn(historyStore, 'getScoreCount').mockReturnValue({
            a: 2,
            b: 3,
            c: 1,
            d: 0,
            e: 0,
            unknown: 1,
        });

        jest.spyOn(historyStore, 'getSortedProducts').mockReturnValue([
            { name: 'Product A', quantity: 5 },
            { name: 'Product B', quantity: 3 },
        ]);

        jest.spyOn(historyStore, 'getTagStatistics').mockReturnValue({
            Tag1: 50,
            Tag2: 50,
        });

        jest.spyOn(historyStore, 'getSortedBrands').mockReturnValue([
            { name: 'Brand A', quantity: 10 },
            { name: 'Brand B', quantity: 5 },
        ]);

        jest.spyOn(historyStore, 'getTopIngredients').mockReturnValue([
            { name: 'Ingredient1', count: 4 },
            { name: 'Ingredient2', count: 2 },
        ]);
    });

    const renderAnalyze = () => {
        return render(
            <BrowserRouter>
                <Analyze />
            </BrowserRouter>
        );
    };

    test('fetches purchase data on load', () => {
        renderAnalyze();
        expect(historyStore.fetchAllPurchases).toHaveBeenCalled();
    });

    test('displays the correct healthy score', () => {
        renderAnalyze();
        expect(screen.getByText(/Your healthy score/i)).toBeInTheDocument();
        expect(screen.getByText('B')).toHaveClass('text-green-400');
    });

    test('renders most frequently bought products', () => {
        renderAnalyze();
        expect(screen.getByText(/Most Frequently Bought/i)).toBeInTheDocument();
        expect(screen.getByText('Product A')).toBeInTheDocument();
    });

    test('renders most popular brands', () => {
        renderAnalyze();
        expect(screen.getByText(/Most Popular Brands/i)).toBeInTheDocument();
        expect(screen.getByText('Brand A')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });


    test('navigates to history page when History List button is clicked', () => {
        renderAnalyze();

        const button = screen.getByText(/History List/i);
        fireEvent.click(button);

        expect(window.location.pathname).toBe('/History');
    });

    test('displays all sections correctly', () => {
        renderAnalyze();

        expect(screen.getByText(/Most Frequently Bought/i)).toBeInTheDocument();
        expect(screen.getByText(/Most Popular Brands/i)).toBeInTheDocument();
        expect(screen.getByText(/Ingredient Occurrences/i)).toBeInTheDocument();
        expect(screen.getByText(/Most Frequent Tags/i)).toBeInTheDocument();
        expect(screen.getByText(/Score Frequency/i)).toBeInTheDocument();
    });
});
