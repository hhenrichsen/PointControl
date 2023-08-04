import { UserService } from '../../service/userservice';
import { Service } from 'typedi';
import Application from 'koa';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import { ResponseCode } from '../../util/responsecode';
import { pipe } from 'fp-ts/function';
import { Logger } from '../../service/logger';

@Service()
export class RegistrationHandler {
    private static readonly Parser = t.type({
        email: t.string,
        password: t.string,
        username: t.string,
    });

    constructor(
        private readonly userService: UserService,
        private readonly logger: Logger
    ) {}

    public readonly middleware = async (
        ctx: Application.ParameterizedContext,
        next: Application.Next
    ) => {
        const unvaildatedBody = RegistrationHandler.Parser.decode(
            ctx.request.body
        );
        await pipe(
            unvaildatedBody,
            E.match(
                async (error) => {
                    ctx.body = { error };
                    ctx.status = ResponseCode.BadRequest;
                },
                async ({ email, password, username }) => {
                    try {
                        this.logger.info(`Creating user ${email}`);
                        const user = await this.userService.createUser(
                            email,
                            password,
                            username
                        );
                        this.logger.info(
                            `Created user ${JSON.stringify(user)}`
                        );
                        ctx.status = ResponseCode.Created;
                        ctx.body = { userId: user.id };
                        next();
                    } catch (e) {
                        this.logger.error(e);
                        ctx.status = ResponseCode.Conflict;
                    }
                }
            )
        );
    };
}
