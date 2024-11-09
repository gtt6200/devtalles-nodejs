import { describe, expect, jest, test } from '@jest/globals';
import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';
import { CreateTable, CreateTableUseOptions } from '../domain/use-cases/create-table.use-case';



describe('ServerApp', () => {
    const options = {
        base: 7,
        limit: 5,
        showTable: true,
        fileDestination: 'test-destination',
        fileName: 'test-filename'
    };
    test('should create ServerApp instance', () => {

        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function');
    });

    test('should run ServerApp with options', () => {

        // ServerApp.run(options);
    });
    test('should run with custom values mock', () => {
        const logMock = jest.fn();
        // const createMock = jest.fn();
        // const createMock = jest.mocked;
        // const saveFileMock = jest.mocked;
        const createMock = jest.fn(() => '');
        const saveFileMock = jest.fn(() => true);
        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server running... ');
        expect(createMock).toHaveBeenCalledWith({ base: options.base, limit: options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({ fileContent: '', fileDestination: options.fileDestination, fileName: options.fileName });
    });
});