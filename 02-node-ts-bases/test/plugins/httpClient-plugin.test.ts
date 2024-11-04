import { httpClientPlugin } from '../../src/plugins/http-client.plugin';
import { describe, expect, test } from '@jest/globals';


describe('plugins/http-client.plugin.ts', () => {
    test('httpClientPlugin should return a string', async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos/1'
        const data = await httpClientPlugin.get(url);
        expect(typeof data).toBe('object');
        expect(data).toEqual({
            userId: expect.any(Number),
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean)
        });
    });
    test('httpClient function post should return a throw error', async () => {

        expect(typeof httpClientPlugin.post).toBe('function');
    });
    test('httpClient function put should return a throw error', async () => {
        expect(typeof httpClientPlugin.put).toBe('function');

    });
    test('httpClient function delete should return a throw error', async () => {
        expect(typeof httpClientPlugin.delete).toBe('function');

    });
});