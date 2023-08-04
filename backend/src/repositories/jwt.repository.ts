import { Service } from 'typedi';
import { DataSource, Repository } from 'typeorm';
import { Jwt } from '../entities/jwt.entity';
import { User } from '../entities/user.entity';

@Service()
export class JwtRepository {
    private readonly repo: Repository<Jwt>;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(Jwt);
    }

    public async createJwt(user: User) {
        const created = new Jwt({ user });
        return this.repo.save(created);
    }
}
