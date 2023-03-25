import Router from "@koa/router";
import { Service } from "typedi";
import { GameRepository } from "../../repositories/game.repository";

@Service()
export class GameRouter {
    public readonly router = new Router();

    constructor(gameQueries: GameRepository) {
        this.router.prefix('/games');

        this.router.get('/', async (ctx) => {
            ctx.body = (await gameQueries.getGames());
        })
    }
}