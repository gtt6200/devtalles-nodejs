import { SaveFile } from './save-file.use-case';
import { afterEach, describe, expect, test } from '@jest/globals';
import fs from 'fs';



describe('SaveFileUseCase', () => {

    afterEach(() => {
        const path = 'outputs';
        if (fs.existsSync(path)) {
            fs.rmSync(path, { recursive: true });
        }
        const pathTest2 = 'custom-outputs';
        if (fs.existsSync(pathTest2)) {
            fs.rmSync(pathTest2, { recursive: true });
        }
    });

    test('should save file with default values', () => {

        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent: 'test content',
        }

        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(filePath);
        const content = fs.readFileSync(filePath, 'utf-8');


        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(content).toBe(options.fileContent)
    });

    test('should save file with custom values', () => {
        const options = {
            fileContent: 'test custom content',
            fileDestination: 'custom-outputs/file-destination',
            fileName: 'custom-table-name'
        }

        const saveFile = new SaveFile();
        const result = saveFile.execute(options);
        const checkFile = fs.existsSync(`${options.fileDestination}/${options.fileName}.txt`);
        const content = fs.readFileSync(`${options.fileDestination}/${options.fileName}.txt`, 'utf-8');


        expect(result).toBe(true);
        expect(checkFile).toBe(true);
        expect(content).toBe(options.fileContent)

    });
});