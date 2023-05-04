import Container from 'typedi';
import { App } from '../../app';
import supertest from 'supertest';

describe(module.id, () => {
    const app = Container.get(App);
    const agent = supertest.agent(app.callback());

    beforeAll(async () => {
        await app.init();
    }, 5000);

    it('GET / - should check health', async () => {
        const response = await agent.get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });

    afterAll(async () => {
        await app.close();
    }, 5000);
});
