import { describe, expect, test } from "@jest/globals";


describe('App', () => {
    test('should be true', () => {
        //1. arrange
        const a = 10;
        const b = 20;
        //2. Act
        const r = a + b;
        //3. Assert
        expect(r).toBe(30);
    });
});