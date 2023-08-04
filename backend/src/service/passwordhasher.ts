import { Service } from 'typedi';
import { Environment } from './environment';
import { hash, verify, Options } from 'argon2';
import { HashedPassword, UnhashedPassword } from '../types/password';

@Service()
export class PasswordHasher {
    private readonly options: Options;

    constructor(private readonly environment: Environment) {
        this.options = {
            salt: Buffer.from(this.environment.get('HASH_SECRET')),
        };
    }

    /**
     * Hashes a password using the argon2 hashing algorithm.
     *
     * @param raw The raw password.
     */
    public async hash(raw: UnhashedPassword): Promise<string> {
        return (await hash(raw, { ...this.options, raw: false })).toString();
    }

    /**
     * Compares a password to the stored password.
     *
     * @param raw The user-provided password.
     * @param stored The stored password.
     */
    public async compare(
        raw: UnhashedPassword,
        stored: HashedPassword
    ): Promise<boolean> {
        return verify(stored, raw, this.options);
    }
}
