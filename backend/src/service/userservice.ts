import { Service } from 'typedi';
import { PasswordHasher } from './passwordhasher';
import { UserRepository } from '../repositories/user.repository';
import { UnhashedPassword } from '../types/password';
import { User } from '../entities/user.entity';

@Service()
export class UserService {
    constructor(
        private readonly passwordHasher: PasswordHasher,
        private readonly userRepo: UserRepository
    ) {}

    public async canLogin(
        email: string,
        password: UnhashedPassword
    ): Promise<User | undefined> {
        const user = await this.userRepo.getUserByEmail(email);
        if (!user) {
            return undefined;
        }
        const valid = await this.passwordHasher.compare(
            password,
            user.passwordHashed
        );
        if (!valid) {
            return undefined;
        }
        return user;
    }

    public async createUser(
        email: string,
        password: UnhashedPassword,
        username: string
    ) {
        const hashedPassword = await this.passwordHasher.hash(password);
        return this.userRepo.createUser(email, hashedPassword, username);
    }
}
