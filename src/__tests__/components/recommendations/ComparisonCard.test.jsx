import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ComparisonCard from '../../../components/recommendations/ComparisonCard';
import { successToast, errorToast } from '../../../utils/Toasts';

jest.mock('../../../utils/Toasts', () => ({
    successToast: jest.fn(),
    errorToast: jest.fn()
}));

jest.mock('../../../components/recommendations/ProductCard', () => {
    return function MockProductCard({ product }) {
        return <div data-testid={`product-card-${product.id}`}>{product.name}</div>;
    };
});

jest.mock('react-icons/fa', () => ({
    FaArrowRight: () => <div data-testid="arrow-right" className="text-gray-500">→</div>
}));

describe('ComparisonCard', () => {
    const mockProductA = {
        id: 'test-id-1',
        name: 'Product A'
    };

    const mockProductB = {
        id: 'test-id-2',
        name: 'Product B'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn()
            }
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render both products and arrow', () => {
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);

        expect(screen.getByTestId('product-card-test-id-1')).toHaveTextContent('Product A');
        expect(screen.getByTestId('product-card-test-id-2')).toHaveTextContent('Product B');
        expect(screen.getAllByTestId('arrow-right')).toHaveLength(2);
    });

    it('should render initial copy button state', () => {
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Copy Code 📋');
        expect(button).toHaveClass('bg-yellow-500');
    });

    it('should handle successful copy to clipboard', async () => {
        navigator.clipboard.writeText.mockImplementation(() => Promise.resolve());
        
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        const button = screen.getByRole('button');
        
        await act(async () => {
            fireEvent.click(button);
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-id-2');
        
        expect(successToast).toHaveBeenCalledWith(
            'Code of product【Product B】copied to clipboard!'
        );

        await waitFor(() => {
            expect(button).toHaveTextContent('Copied! ✓');
            expect(button).toHaveClass('bg-green-500');
        });

        await act(async () => {
            jest.advanceTimersByTime(3500);
        });

        await waitFor(() => {
            expect(button).toHaveTextContent('Copy Code 📋');
            expect(button).toHaveClass('bg-yellow-500');
        });
    });

    it('should handle clipboard error', async () => {
        navigator.clipboard.writeText.mockImplementation(() => Promise.reject(new Error('Clipboard error')));
        
        render(<ComparisonCard productA={mockProductA} productB={mockProductB} />);
        
        const button = screen.getByRole('button');
        
        await act(async () => {
            fireEvent.click(button);
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test-id-2');
        
        expect(errorToast).toHaveBeenCalledWith('Failed to copy code. Please try again.');

        await waitFor(() => {
            expect(button).toHaveTextContent('Error! Try Again');
            expect(button).toHaveClass('bg-red-500');
        });

        await act(async () => {
            jest.advanceTimersByTime(3500);
        });

        await waitFor(() => {
            expect(button).toHaveTextContent('Copy Code 📋');
            expect(button).toHaveClass('bg-yellow-500');
        });
    });

    it('should handle missing product code', async () => {
        const productWithoutId = { ...mockProductB, id: '' };
        
        render(<ComparisonCard 
            productA={mockProductA} 
            productB={productWithoutId} 
        />);
        
        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
        expect(errorToast).toHaveBeenCalledWith('No product code available');
        
        await waitFor(() => {
            expect(button).toHaveTextContent('Error! Try Again');
            expect(button).toHaveClass('bg-red-500');
        });
    });

    it('should handle responsive layout', () => {
        const { container } = render(
            <ComparisonCard productA={mockProductA} productB={mockProductB} />
        );
        
        expect(container.firstChild).toHaveClass(
            'flex', 
            'flex-col', 
            'items-center', 
            'bg-gray-100', 
            'rounded-lg', 
            'shadow-lg'
        );
    });
});