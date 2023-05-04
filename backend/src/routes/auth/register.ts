import { UserService } from '../../service/userservice';
import { Service } from 'typedi';
import Application from 'koa';

@Service()
export class RegisterRoute {
    constructor(private readonly userService: UserService) {}

    public async handle(ctx: Application.ParameterizedContext) {
        const email = ctx.request.body['email'];
        const password = ctx.request.body['password'];
    }
}
