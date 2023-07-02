import { Service } from 'typedi';
import { DefaultContext, ParameterizedContext } from 'koa';

@Service()
export class HealthHandler {
    public readonly middleware = (
        ctx: ParameterizedContext<DefaultContext>
    ): void => {
        ctx.body = 'OK';
        ctx.status = 200;
    };
}
