import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { User } from './user.entity';

@Entity()
export class Jwt {
    constructor(props: Partial<Jwt>) {
        Object.assign(this, props);
    }

    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.tokens)
    user: User;

    @Column('boolean')
    revoked = false;
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: Jwt });
