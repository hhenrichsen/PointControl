import { Service } from 'typedi';
import { DefaultContext, ParameterizedContext } from 'koa';
import { GameRepository } from '../../repositories/game.repository';

@Service()
export class GameListHandler {
    constructor(private readonly gameQueries: GameRepository) {}

    public readonly middleware = async (
        ctx: ParameterizedContext<DefaultContext>
    ): Promise<void> => {
        ctx.body = await this.gameQueries.getGames();
        ctx.status = 200;
    };
}
