import { describe, expect, test } from '@jest/globals';
import { emailTemplate } from '../../src/js-foundation/01-template';


describe('js-foundation/01-template.ts', () => {
    test('emailTemplate should contain a greeting', () => {
        expect(emailTemplate).toContain('Hi, ');
        expect(emailTemplate).toMatch(/{{name}}/);
        expect(emailTemplate).toMatch(/{{orderId}}/);
    });
});