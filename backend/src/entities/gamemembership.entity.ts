import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    ManyToMany,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { User } from './user.entity';
import { JoinTable } from 'typeorm/browser';
import { Game } from './game.entity';
import { Role } from './role.entity';

@Entity()
export class GameMembership {
    constructor(props: Partial<GameMembership>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    @Generated('increment')
    id: number;

    @ManyToOne(() => User)
    member: User;

    @ManyToOne(() => Game)
    game: Game;

    @ManyToOne(() => Role)
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version = 0;
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: GameMembership });
