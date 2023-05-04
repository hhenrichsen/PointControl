import { Service } from 'typedi';
import { Environment } from './environment';
import { hash, verify, Options } from 'argon2';
import { HashedPassword, UnhashedPassword } from '../types/password';

@Service()
export class PasswordHasher {
    private readonly decodeOptions: Options;

    private readonly hashOptions: Options & { raw: true };

    constructor(private readonly environment: Environment) {
        this.decodeOptions = {
            secret: Buffer.from(this.environment.get('HASH_SECRET')),
        };

        this.hashOptions = {
            ...this.decodeOptions,
            raw: true,
        };
    }

    /**
     * Hashes a password using the argon2 hashing algorithm.
     *
     * @param raw The raw password.
     */
    public async hash(raw: UnhashedPassword): Promise<string> {
        return (await hash(raw, this.hashOptions)).toString('utf-8');
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
        return verify(stored, raw, this.decodeOptions);
    }
}
