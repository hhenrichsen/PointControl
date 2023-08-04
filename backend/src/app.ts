import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import Koa from 'koa';
import koaBody from 'koa-body';
import { RouterToken } from './routes/base';
import { Logger } from './service/logger';
import { Environment } from './service/environment';
import './routes';

@Service()
export class App {
    private readonly koa = new Koa();

    constructor(
        private readonly environment: Environment,
        private readonly logger: Logger
    ) {}

    public async init() {
        this.koa.use(koaBody());

        // Find all the routers we're aware of and use them
        Container.getMany(RouterToken).forEach((routerContainer) => {
            this.koa.use(routerContainer.router.routes());
            this.koa.use(routerContainer.router.allowedMethods());
        });
    }

    public listen(portOverride?: number) {
        const port =
            portOverride ?? this.environment.getOpt('PORT', parseInt) ?? 3000;
        this.logger.info(`Listening on ${port}`);
        this.koa.listen(port);
    }

    public close() {
        return Promise.all([Container.get(DataSource).destroy()]);
    }

    public callback() {
        return this.koa.callback();
    }
}
