import { withApp } from '../../app.test';
import { ResponseCode } from '../../util/responsecode';

describe(module.id, () => {
    const { agent } = withApp();

    it('should be able to log in', async () => {
        const registerResponse = await agent.post('/auth/register').send({
            email: 'login@test.test',
            password: 'test',
            username: 'login',
        });

        expect(registerResponse.status).toBe(ResponseCode.Created);

        const loginResponse = await agent.post('/auth/login').send({
            email: 'login@test.test',
            password: 'test',
        });

        expect(loginResponse.status).toBe(ResponseCode.Ok);
    });

    it('should not log in with incorrect credentials', async () => {
        const registerResponse = await agent.post('/auth/register').send({
            email: 'login2@test.test',
            password: 'test',
            username: 'login2',
        });

        expect(registerResponse.status).toBe(ResponseCode.Created);

        const loginResponse = await agent.post('/auth/login').send({
            email: 'login2@test.test',
            password: 'hunter2',
        });

        expect(loginResponse.status).toBe(ResponseCode.BadRequest);
    });
});
