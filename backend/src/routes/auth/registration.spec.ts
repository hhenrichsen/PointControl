import { AppTestTimeout, withApp } from '../../app.test';
import { ResponseCode } from '../../util/responsecode';

describe(module.id, () => {
    const { agent } = withApp();

    it(
        'POST /auth/registration - should register user',
        async () => {
            const response = await agent.post('/auth/register').send({
                email: 'register@test.test',
                password: 'test',
                username: 'register',
            });

            expect(response.status).toBe(ResponseCode.Created);

            const secondResponse = await agent.post('/auth/register').send({
                email: 'register@test.test',
                password: 'test',
                username: 'register',
            });

            expect(secondResponse.status).toBe(ResponseCode.Conflict);
        },
        AppTestTimeout
    );
});
