import Router from '@koa/router';
import { Service } from 'typedi';
import { GameRepository } from '../../repositories/game.repository';
import { RouterToken } from '../base';
import { GameListHandler } from './gamelisthandler';

@Service({ id: RouterToken, multiple: true })
export class GameRouter {
    public readonly router = new Router();

    constructor(gameListHandler: GameListHandler) {
        this.router.prefix('/games');

        this.router.get('/', gameListHandler.middleware);
    }
}
