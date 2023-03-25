import Logger from 'bunyan';
import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { DataSourceFactory } from './service/datasourcefactory';
import koa from "koa";
import { GameRouter } from './routes/games/gamerouter';

@Service()
export class App {
    private readonly koa = new koa();

    constructor(
        private readonly dataSourceFactory: DataSourceFactory,
        private readonly logger: Logger,
    ) {}

    public async init() {
        this.logger.info('Connecting to database...');
        const dataSource = this.dataSourceFactory.create();
        await dataSource.initialize();
        Container.set(DataSource, dataSource);
        this.logger.info('Connected!');
        
        const gameRouter = Container.get(GameRouter)
        
        this.koa.use(
            gameRouter.router.routes(),
        )
        this.koa.use(
            gameRouter.router.allowedMethods()
        )
        
        console.log("Listening on 3000")
        this.koa.listen(3000);
        
    }
}
