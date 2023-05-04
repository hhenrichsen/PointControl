import { Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HashedPassword } from '../types/password';

@Service()
export class UserRepository {
    private repo: Repository<User>;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(User);
    }

    public async createUser(email: string, password_hashed: HashedPassword) {
        return this.repo.create({ email, passwordHashed: password_hashed });
    }

    public async getUserByEmail(email: string) {
        return this.repo.findOne({ where: { email } });
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return (await this.repo.findOne({ where: { id } })) ?? undefined;
    }

    public async getUsers(page = 0, count = 50): Promise<User[]> {
        return (
            (await this.repo.find({
                take: count,
                skip: page * count,
            })) ?? []
        );
    }
}
