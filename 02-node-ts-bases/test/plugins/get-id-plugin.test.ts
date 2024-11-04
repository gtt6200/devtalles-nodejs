import { getUUID } from '../../src/plugins/get-id.plugin';
import { describe, expect, test } from '@jest/globals';


describe('plugin/get-id-plugin.ts', () => {
    test('getUUID shoul return a String', () => {
        const id = getUUID();

        expect(typeof id).toBe('string');
    });

    test('getUUID should return a string of 36 characters', () => {
        const id = getUUID();
        const idLenght: number = 36;
        expect(id).toHaveLength(idLenght);
    });
});