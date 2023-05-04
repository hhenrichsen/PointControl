import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { Game } from '../entities/game.entity';

@Service()
export class GameRepository {
    private repo;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(Game);
    }

    public async getGameById(id: string): Promise<Game | undefined> {
        return (await this.repo.findOne({ where: { id } })) ?? undefined;
    }

    public async getGames(): Promise<Game[]> {
        return (await this.repo.find()) ?? [];
    }
}
