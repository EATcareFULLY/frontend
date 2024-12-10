import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecommendationModal from '../../../components/recommendations/RecommendationModal';
import { recommendationsStore } from '../../../stores/RecommendationsStore';

jest.mock('../../../stores/RecommendationsStore', () => ({
    recommendationsStore: {
        fetchRecommendations: jest.fn(),
        recommendations: [],
        getSourceProduct: jest.fn(),
        productRecommendationsData: {}
    }
}));

jest.mock('../../../components/recommendations/ComparisonCard', () => {
    return function MockComparisonCard({ productA, productB }) {
        return (
            <div data-testid="comparison-card">
                <span>{productA?.name}</span>
                <span>{productB?.name}</span>
            </div>
        );
    };
});

jest.mock('react-icons/fa', () => ({
    FaSadTear: () => <div data-testid="sad-icon">😢</div>
}));

describe('RecommendationModal', () => {
    const mockCloseModal = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render initial loading state', () => {
        render(<RecommendationModal closeModal={mockCloseModal} />);
        expect(screen.getByText('Loading recommendations...')).toBeInTheDocument();
    });

    it('should handle successful recommendations load', async () => {
        const mockRecommendations = [
            { id: '1', name: 'Product 1' },
            { id: '2', name: 'Product 2' }
        ];
        
        recommendationsStore.recommendations = mockRecommendations;
        recommendationsStore.getSourceProduct.mockReturnValue({ id: 'source', name: 'Source Product' });
        recommendationsStore.fetchRecommendations.mockResolvedValue(mockRecommendations);

        render(<RecommendationModal closeModal={mockCloseModal} />);

        await waitFor(() => {
            expect(screen.queryByText('Loading recommendations...')).not.toBeInTheDocument();
        });

        expect(screen.getAllByTestId('comparison-card')).toHaveLength(2);
    });

    it('should handle empty recommendations', async () => {
        recommendationsStore.recommendations = [];
        recommendationsStore.fetchRecommendations.mockResolvedValue([]);

        render(<RecommendationModal closeModal={mockCloseModal} />);

        await waitFor(() => {
            expect(screen.getByText('No new recommendations.')).toBeInTheDocument();
            expect(screen.getByTestId('sad-icon')).toBeInTheDocument();
        });
    });

    it('should handle close button click', async () => {
        render(<RecommendationModal closeModal={mockCloseModal} />);

        const closeButton = screen.getByText('✕');
        fireEvent.click(closeButton);

        await act(async () => {
            jest.advanceTimersByTime(500);
        });

        expect(mockCloseModal).toHaveBeenCalled();
    });

    it('should animate in on mount', async () => {
        const { container } = render(<RecommendationModal closeModal={mockCloseModal} />);

        expect(container.firstChild).toHaveClass('translate-y-full');

        await act(async () => {
            jest.advanceTimersByTime(100);
        });

        expect(container.firstChild).toHaveClass('translate-y-[-40%]');
    });

    it('should handle fetch error gracefully', async () => {
        recommendationsStore.fetchRecommendations.mockRejectedValue(new Error('Fetch failed'));

        render(<RecommendationModal closeModal={mockCloseModal} />);

        await waitFor(() => {
            expect(screen.getByText('No new recommendations.')).toBeInTheDocument();
        });
    });

    it('should cleanup on unmount', () => {
        const { unmount } = render(<RecommendationModal closeModal={mockCloseModal} />);

        unmount();

        act(() => {
            jest.runAllTimers();
        });
    });

    it('should render with correct responsive classes', () => {
        const { container } = render(<RecommendationModal closeModal={mockCloseModal} />);

        expect(container.firstChild).toHaveClass(
            'fixed',
            'bottom-0',
            'left-1/2',
            'transform',
            '-translate-x-1/2',
            'w-11/12',
            'md:w-3/4'
        );
    });

    it('should render recommendations list with correct styling', async () => {
        recommendationsStore.recommendations = [{ id: '1', name: 'Product 1' }];
        recommendationsStore.fetchRecommendations.mockResolvedValue([{ id: '1', name: 'Product 1' }]);

        render(<RecommendationModal closeModal={mockCloseModal} />);

        await waitFor(() => {
            const list = screen.getByRole('list');
            expect(list).toHaveClass(
                'flex',
                'flex-col',
                'gap-4',
                'overflow-y-auto',
                'border',
                'border-yellow-500'
            );
        });
    });
});