import { describe, expect, test, jest } from '@jest/globals';
import { getAge } from '../../src/plugins/get-age.plugin';


describe('plugins/get-age-plugin.ts', () => {
    test('getAge should be return age of a person', () => {
        const birthdate: string = '2000-11-15';
        const age = getAge(birthdate);
        expect(typeof age).toBe('number');
    });

    test('getAge should return currentAge', () => {
        const birthdate: string = '2000-11-15';
        const age = getAge(birthdate);
        const currentAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        expect(age).toBe(currentAge);
    });

    test('getAge shoul return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(2000);
        const birthdate = '2000-11-15';
        const age = getAge(birthdate);
        expect(age).toBe(0);
        expect(spy).toBeCalledWith();
    });
});