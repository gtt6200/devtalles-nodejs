import exp from 'constants';
import { CreateTable } from './create-table.use-case';
import { expect, test, describe } from "@jest/globals";

describe('CreateTableUseCase', () => {
    test('should return a table of 6 as base and 10 as limit', () => {
        const useCase = new CreateTable();
        const options = { base: 6, limit: 10 };
        const result = useCase.execute(options);
        const expectedResult = `6 X 1 = 6
6 X 2 = 12
6 X 3 = 18
6 X 4 = 24
6 X 5 = 30
6 X 6 = 36
6 X 7 = 42
6 X 8 = 48
6 X 9 = 54
6 X 10 = 60`;
        expect(result).toBe(expectedResult);
    });
    test('should return create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2, limit: 12 });
        const rows = table.split('\n').length;
        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 X 1 = 2');
        expect(table).toContain('2 X 12 = 24');
        expect(rows).toBe(12);
    });
});
