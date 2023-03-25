// Load environment
import { config as loadEnv } from 'dotenv';
loadEnv();

// Set up reflection
import 'reflect-metadata';

import Container from 'typedi';
import { App } from './app';
import Logger, { createLogger } from 'bunyan';

Container.set(
    Logger,
    createLogger({
        name: 'app',
        stream: process.stdout,
        level: 'info',
    })
);

Container.get(App).init();
