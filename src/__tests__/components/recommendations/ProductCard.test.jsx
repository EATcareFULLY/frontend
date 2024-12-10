import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComparisonCard from '../../../components/recommendations/ComparisonCard';
import { successToast, errorToast } from '../../../utils/Toasts';

// Mocks
jest.mock('react-icons/fa', () => ({
    FaArrowRight: () => <div data-testid="arrow-right">Arrow</div>,
    FaArrowUp: () => <div data-testid="arrow-up">ArrowUp</div>
}));

jest.mock('../../../utils/Toasts', () => ({
    successToast: jest.fn(),
    errorToast: jest.fn()
}));

jest.mock('../../../components/recommendations/ProductCard', () => {
    return function MockProductCard({ product }) {
        return <div data-testid={`product-card-${product.id}`}>{product.name}</div>;
    };
});

describe('ComparisonCard', () => {
    const mockProductA = {
        id: 'test-id-1',
        name: 'Test Product A'
    };

    const mockProductB = {
        id: 'test-id-2',
        name: 'Test Product B'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn()
            }
        });
    });

    test('should render products and arrow icons', () => {
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        // Sprawdź karty produktów
        expect(screen.getByTestId(`product-card-${mockProductA.id}`)).toBeInTheDocument();
        expect(screen.getByTestId(`product-card-${mockProductB.id}`)).toBeInTheDocument();
        
        // Sprawdź obie strzałki (mobilna i desktopowa)
        const arrows = screen.getAllByTestId('arrow-right');
        expect(arrows).toHaveLength(2);
        expect(arrows[0]).toBeInTheDocument(); // desktop arrow
        expect(arrows[1]).toBeInTheDocument(); // mobile arrow
    });

    // Reszta testów pozostaje bez zmian...
    test('displays initial "Copy Code" button state', () => {
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        const copyButton = screen.getByRole('button');
        expect(copyButton).toHaveTextContent('Copy Code 📋');
        expect(copyButton).toHaveClass('bg-yellow-500');
    });

    test('handles successful code copy', async () => {
        navigator.clipboard.writeText.mockResolvedValueOnce();
        
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        const copyButton = screen.getByRole('button');
        await fireEvent.click(copyButton);

        await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockProductB.id);
        });

        await waitFor(() => {
            expect(successToast).toHaveBeenCalledWith(
                `Code of product【${mockProductB.name}】copied to clipboard!`
            );
        });

        await waitFor(() => {
            expect(copyButton).toHaveTextContent('Copied! ✓');
            expect(copyButton).toHaveClass('bg-green-500');
        });
    });

    test('handles clipboard error correctly', async () => {
        const clipboardError = new Error('Clipboard error');
        navigator.clipboard.writeText.mockRejectedValueOnce(clipboardError);
        
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        const copyButton = screen.getByRole('button');
        await fireEvent.click(copyButton);

        await waitFor(() => {
            expect(errorToast).toHaveBeenCalledWith('Failed to copy code. Please try again.');
        });

        await waitFor(() => {
            expect(copyButton).toHaveTextContent('Error! Try Again');
            expect(copyButton).toHaveClass('bg-red-500');
        });
    });

    test('handles missing product code', async () => {
        const productWithoutId = {
            id: '',
            name: 'No ID Product'
        };

        render(<ComparisonCard 
            productA={mockProductA} 
            productB={productWithoutId} 
        />);
        
        const copyButton = screen.getByRole('button');
        fireEvent.click(copyButton);

        await waitFor(() => {
            expect(errorToast).toHaveBeenCalledWith('No product code available');
            expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
        });
    });
});