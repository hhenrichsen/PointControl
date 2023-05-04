import Router from '@koa/router';
import { Service } from 'typedi';
import { RouterToken } from '../base';

@Service({ id: RouterToken, multiple: true })
export class HealthRouter {
    public readonly router = new Router();

    constructor() {
        this.router.prefix('/');

        this.router.get('/', async (ctx) => {
            ctx.body = 'OK';
        });
    }
}
