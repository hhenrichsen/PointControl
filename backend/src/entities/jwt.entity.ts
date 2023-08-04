import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { User } from './user.entity';

const TWO_WEEKS_MS = 1209600000;

@Entity()
export class Jwt {
    constructor(props: Partial<Jwt>) {
        Object.assign(this, props);
    }

    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.tokens, { onDelete: 'CASCADE' })
    user: User;

    @Column('boolean')
    revoked = false;

    @Column('timestamp')
    expiry: Date = new Date(+new Date() + TWO_WEEKS_MS);
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: Jwt });
