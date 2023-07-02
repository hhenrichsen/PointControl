import Router from '@koa/router';
import { Service } from 'typedi';
import { RouterToken } from '../base';
import { HealthHandler } from './healthhandler';

@Service({ id: RouterToken, multiple: true })
export class HealthRouter {
    public readonly router = new Router();

    constructor(healthHandler: HealthHandler) {
        this.router.prefix('/');

        this.router.get('/', healthHandler.middleware);
    }
}
