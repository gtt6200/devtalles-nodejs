import { describe, test, expect, jest } from '@jest/globals';
import { ServerApp } from './presentation/server-app';



describe('Test App.ts', () => {
    test('should call Server.run whit values', async () => {
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;
        process.argv = ['node', 'app.ts', '-b', '2', '-l', '3', '-s', '-n', 'custom-table-name', '-d', 'custom-outputs'];
        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith
            ({
                base: 2,
                limit: 3,
                showTable: true,
                fileName: 'custom-table-name',
                fileDestination: 'custom-outputs'
            });
    });
});