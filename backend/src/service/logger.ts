import * as bunyan from 'bunyan';
import { Environment } from './environment';
import { Service } from 'typedi';

@Service()
export class Logger extends bunyan.default {
    constructor(private readonly environment: Environment) {
        super({
            name: 'app',
            stream: process.stdout,
            level: environment.isDev() ? 'trace' : 'info',
        });
    }
}
