// Load environment
import { config as loadEnv } from 'dotenv';
loadEnv();

// Set up reflection
import 'reflect-metadata';

import Container from 'typedi';
import { App } from './app';
import { DataSourceFactory } from './service/datasourcefactory';
import { DataSource } from 'typeorm';

async function run() {
    const dataSourceFactory = Container.get(DataSourceFactory);
    const dataSource = dataSourceFactory.create();
    await dataSource.initialize();
    Container.set(DataSource, dataSource);

    const app = Container.get(App);
    app.init().then(() => app.listen());
}

run();
