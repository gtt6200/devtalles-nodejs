import { beforeEach, describe, expect, jest, test } from "@jest/globals";

const runComand = async (args: string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}


describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async () => {
        const argv = await runComand(['-b', '2']);

        expect(argv).toEqual(expect.objectContaining({
            b: 2,
            l: 12,
            s: false,
            n: 'table',
            d: './outputs'
        }));

    });

    test('should return congiguration with custom values', async () => {
        const argv = await runComand(['-b', '2', '-l', '3', '-s', '-n', 'custom-table-name', '-d', 'custom-outputs']);

        expect(argv).toEqual(expect.objectContaining({
            b: 2,
            l: 3,
            s: true,
            n: 'custom-table-name',
            d: 'custom-outputs'
        }));

    });

});