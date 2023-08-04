import { Service } from 'typedi';
import { DefaultContext, ParameterizedContext } from 'koa';
import { DataSource } from 'typeorm';

@Service()
export class HealthHandler {
    constructor(private readonly dataSource: DataSource) {}

    public readonly middleware = async (
        ctx: ParameterizedContext<DefaultContext>
    ): Promise<void> => {
        const _res = await this.dataSource.query('SELECT 1=1');
        ctx.body = 'OK';
        ctx.status = 200;
    };
}
