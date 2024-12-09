import exp from 'constants';
import { envs } from './envs.plugin';


describe('envs.plugin.ts', () => {
    test('should returns envs options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: "user@email.com",
            MAILER_SECRET_KEY: "cualquiercosa",
            PROD: false,
            MONGO_URL: 'mongodb://gtt6200:root-test@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'gtt6200',
            MONGO_PASS: 'root-test',
            POSTGRES_URL: 'postgresql://postgres:root-test@localhost:5432/NOC',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'NOC-TEST',
            POSTGRES_PASSWORD: 'root-test'
        });
    });
    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';
        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    });

})