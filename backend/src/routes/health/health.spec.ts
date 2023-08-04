import { withApp } from '../../app.test';

describe(module.id, () => {
    const { agent } = withApp();

    it('GET / - should check health', async () => {
        const response = await agent.get('/');

        expect(response.status).toBe(200);
        expect(response.text).toBe('OK');
    });
});
