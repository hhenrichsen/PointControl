import { EntityToken } from '../entities/base';
import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';

// Make sure we get entities into the injector.
import '../entities/game.entity';
import { Logger } from './logger';

@Service()
export class TestDataSourceFactory {
    constructor(private readonly logger: Logger) {}

    create() {
        const entities = [...Container.getMany(EntityToken)];
        this.logger.info(`Registerred ${entities.length} entities.`);

        return new DataSource({
            type: 'postgres',
            url: 'postgres://postgres:password@db:5432/test',
            entities,
            migrationsTableName: '_migrations',
            synchronize: true,
        });
    }
}
