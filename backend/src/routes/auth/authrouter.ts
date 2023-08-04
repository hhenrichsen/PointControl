import Router from '@koa/router';
import { Service } from 'typedi';
import { RouterToken } from '../base';
import { RegistrationHandler } from './registrationhandler';
import { LoginHandler } from './loginhandler';

@Service({ id: RouterToken, multiple: true })
export class AuthRouter {
    public readonly router = new Router();

    constructor(
        registrationHandler: RegistrationHandler,
        loginHandler: LoginHandler
    ) {
        this.router.prefix('/auth');

        this.router.post('/register', registrationHandler.middleware);
        this.router.post('/login', loginHandler.middleware);
    }
}
