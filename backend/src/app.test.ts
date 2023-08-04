import Container from 'typedi';
import { App } from './app';
import supertest from 'supertest';
import { TestDataSourceFactory } from './service/datasourcefactory.test';
import { DataSource } from 'typeorm';

export const AppTestTimeout = 10 * 1000;

const dataSourceFactory = Container.get(TestDataSourceFactory);
const dataSource = dataSourceFactory.create();
export function withApp() {
    Container.set(DataSource, dataSource);
    const app = Container.get(App);
    const agent = supertest.agent(app.callback());

    beforeAll(async () => {
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
        await app.init();
    }, 10000);

    afterAll(async () => {
        await app.close();
    }, 10000);

    return { agent };
}
