import { Service } from 'typedi';
import { PasswordHasher } from './passwordhasher';
import { UserRepository } from '../repositories/user.repository';
import { HashedPassword, UnhashedPassword } from '../types/password';

@Service()
export class UserService {
    constructor(
        private readonly passwordHasher: PasswordHasher,
        private readonly userRepo: UserRepository
    ) {}

    public async canLogin(email: string, password: UnhashedPassword) {
        const user = await this.userRepo.getUserByEmail(email);
        if (!user) {
            return false;
        }
        return this.passwordHasher.compare(password, user.passwordHashed);
    }

    public async createUser(email: string, password: UnhashedPassword) {
        const hashedPassword = await this.passwordHasher.hash(password);
        return this.userRepo.createUser(email, hashedPassword);
    }
}
