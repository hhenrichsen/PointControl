import { Service } from 'typedi';
import { Environment } from './environment';
import { sign, verify, decode } from 'jsonwebtoken';
@Service()
export class JwtService {
    private readonly key: string;
    constructor(environment: Environment) {
        this.key = environment.get('JWT_KEY');
    }

    public async sign(payload: string | object | Buffer) {
        return sign(payload, this.key);
    }

    public async verify(token: string) {
        return verify(token, this.key);
    }

    public async decode(token: string) {
        return decode(token);
    }
}
