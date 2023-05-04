// Load environment
import { config as loadEnv } from 'dotenv';
loadEnv();

// Set up reflection
import 'reflect-metadata';

import Container from 'typedi';
import { App } from './app';

const app = Container.get(App);
app.init().then(() => app.listen());
