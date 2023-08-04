import { Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { HashedPassword } from '../types/password';
import { Logger } from '../service/logger';

@Service()
export class UserRepository {
    private readonly repo: Repository<User>;

    constructor(dataSource: DataSource, private readonly logger: Logger) {
        this.repo = dataSource.getRepository(User);
    }

    public async createUser(
        email: string,
        passwordHashed: HashedPassword,
        username: string
    ) {
        const data = new User({ email, passwordHashed, username });
        return await this.repo.save(data);
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
