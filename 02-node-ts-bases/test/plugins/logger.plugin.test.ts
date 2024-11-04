import { buildLogger, logger as WinstonLogger } from '../../src/plugins/logger.plugin';
import { describe, expect, jest, test } from '@jest/globals';


describe('plugins/logger.plugin.ts', () => {
    test('Logger should return a function logger', () => {

        const logger = buildLogger('test');
        expect(typeof logger.log).toBe('function');
        expect(typeof logger.error).toBe('function');

    });
    test('logger.log should log a message', () => {
        const winstonLogMock = jest.spyOn(WinstonLogger, 'log');
        const message = 'test message';
        const service = 'test service';

        const logger = buildLogger(service);
        logger.log(message);

        expect(winstonLogMock).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                level: 'info',
                message,
                service
            })
        );
    });
});