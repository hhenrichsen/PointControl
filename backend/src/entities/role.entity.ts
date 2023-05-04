import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { User } from './user.entity';
import { Game } from './game.entity';

@Entity()
export class Role {
    constructor(props: Partial<Role>) {
        Object.assign(this, props);
    }

    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column('varchar', { length: 128 })
    name: string;

    @ManyToOne(() => Game)
    game: Game;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version = 0;
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: Role });
