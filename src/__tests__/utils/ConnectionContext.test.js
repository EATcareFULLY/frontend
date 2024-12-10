import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ConnectionProvider, ConnectionContext } from '../../utils/ConnectionContext';
import ApiService from '../../services/ApiService';

jest.mock('../../services/ApiService');

describe('ConnectionProvider', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('provides default context value', () => {
        const TestComponent = () => {
            const { connected } = React.useContext(ConnectionContext);
            return <div data-testid="connection-status">{connected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <ConnectionProvider>
                <TestComponent />
            </ConnectionProvider>
        );

        expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');
    });

    test('updates context value when connection status changes to true', async () => {
        ApiService.checkConnection.mockResolvedValueOnce(true);

        const TestComponent = () => {
            const { connected } = React.useContext(ConnectionContext);
            return <div data-testid="connection-status">{connected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <ConnectionProvider>
                <TestComponent />
            </ConnectionProvider>
        );

        expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');

        await waitFor(() => {
            expect(screen.getByTestId('connection-status')).toHaveTextContent('Connected');
        });
    });

    test('updates context value when connection status changes to false', async () => {
        ApiService.checkConnection.mockResolvedValueOnce(false);

        const TestComponent = () => {
            const { connected } = React.useContext(ConnectionContext);
            return <div data-testid="connection-status">{connected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <ConnectionProvider>
                <TestComponent />
            </ConnectionProvider>
        );

        expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');

        await waitFor(() => {
            expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');
        });
    });

    test('handles API errors gracefully', async () => {
        ApiService.checkConnection.mockRejectedValueOnce(new Error('API Error'));

        const TestComponent = () => {
            const { connected } = React.useContext(ConnectionContext);
            return <div data-testid="connection-status">{connected ? 'Connected' : 'Disconnected'}</div>;
        };

        render(
            <ConnectionProvider>
                <TestComponent />
            </ConnectionProvider>
        );

        expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');

    });


});
