import { Token } from 'typedi';
import Router from '@koa/router';

export const RouterToken = new Token<{ router: Router }>('routers');
