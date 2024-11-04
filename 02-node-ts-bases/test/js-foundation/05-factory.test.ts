import { describe, expect, test } from '@jest/globals';
import { buildMakePerson } from '../../src/js-foundation/05-factory';


describe('js-foundation/05-factory', () => {

    const getUUID = () => '1234'
    const getAge = () => 35;
    test('should return something', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        expect(typeof makePerson).toBe('function');
    });

    test('makePerson shoul return a person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });
        const jhonDoe = makePerson({ name: 'John', birthdate: '1985-10-21' });
        expect(jhonDoe).toEqual(
            {
                id: '1234',
                name: 'John',
                birthdate: '1985-10-21',
                age: 35
            });
    });
});