import { getUserById } from './../../src/js-foundation/04-arrow';
import { describe, expect, test } from '@jest/globals';

describe('js-foundation/03-callbacks.ts', () => {
    test('getUserById should return an error if user does not exist', (done) => {
        const id = 10;
        getUserById(id, (err, user) => {
            expect(err).toBe(`User not found with id ${id}`);
            expect(user).toBeUndefined();
            done();
        });
    });
    test('getUserById shoul return a object type User to John Doe', (done) => {
        const id = 1;
        interface User {
            id: number,
            name: string
        }
        const jhon: User = { 'id': 1, 'name': 'John Doe' };
        getUserById(id, (err, user) => {
            expect(err).toBeUndefined();
            expect(user).toEqual(jhon);
            done();
        });
    });
});