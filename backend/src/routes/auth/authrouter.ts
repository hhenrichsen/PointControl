import Router from '@koa/router';
import { Service } from 'typedi';
import { GameRepository } from '../../repositories/game.repository';
import { RouterToken } from '../base';

@Service({ id: RouterToken, multiple: true })
export class AuthRouter {
    public readonly router = new Router();

    constructor() {
        this.router.prefix('/auth');

        this.router.post('/register', (ctx) => {

        })
    }
}
