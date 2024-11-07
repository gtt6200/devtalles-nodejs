import { SaveFile } from './save-file.use-case';
import { afterEach, describe, expect, jest, test } from '@jest/globals';
import fs from 'fs';



describe('SaveFileUseCase', () => {
    const options = {
        fileContent: 'test custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name'
    }


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
    test('shoul return false if directory could not be created', () =>{
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('This is a custom error message from string ');
        });
        const result = saveFile.execute(options);
        expect(result).toBe(false);
        mkdirSpy.mockRestore();
    });
    test('shoul return false if file could not be created', () =>{
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom  writing error message ');
        });

        const result = saveFile.execute({fileContent: 'hola'});
        expect(result).toBe(false);
        writeFileSpy.mockRestore();
    });
});