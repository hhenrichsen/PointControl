import { UserService } from '../../service/userservice';
import { Service } from 'typedi';
import Application from 'koa';
import * as t from 'io-ts';
import * as E from 'fp-ts/Either';
import { ResponseCode } from '../../util/responsecode';
import { pipe } from 'fp-ts/function';
import { Logger } from '../../service/logger';
import { JwtService } from '../../service/jwtservice';
import { JwtRepository } from '../../repositories/jwt.repository';

@Service()
export class LoginHandler {
    private static readonly Parser = t.type({
        email: t.string,
        password: t.string,
    });

    constructor(
        private readonly userService: UserService,
        private readonly jwtRepository: JwtRepository,
        private readonly jwtService: JwtService,
        private readonly logger: Logger
    ) {}

    public readonly middleware = async (
        ctx: Application.ParameterizedContext,
        next: Application.Next
    ) => {
        const unvaildatedBody = LoginHandler.Parser.decode(ctx.request.body);
        await pipe(
            unvaildatedBody,
            E.match(
                async (error) => {
                    ctx.body = { error };
                    ctx.status = ResponseCode.BadRequest;
                },
                async ({ email, password }) => {
                    try {
                        const user = await this.userService.canLogin(
                            email,
                            password
                        );
                        if (!user) {
                            ctx.status = ResponseCode.BadRequest;
                            ctx.body = { error: 'Invalid credentials' };
                            return;
                        }
                        const jwt = await this.jwtRepository.createJwt(user);
                        const signed = await this.jwtService.sign({
                            id: jwt.id,
                            user: user.id,
                        });
                        ctx.status = ResponseCode.Ok;
                        ctx.body = {
                            token: signed,
                        };
                        next();
                    } catch (e) {
                        this.logger.error(e);
                        ctx.status = ResponseCode.InternalServerError;
                    }
                }
            )
        );
    };
}
