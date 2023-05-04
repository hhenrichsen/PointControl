import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    OneToMany,
    PrimaryColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { Jwt } from './jwt.entity';
import { Game } from './game.entity';
import { GameMembership } from './gamemembership.entity';
import { HashedPassword } from '../types/password';

@Entity()
export class User {
    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }

    @PrimaryColumn({ type: 'uuid' })
    @Generated('uuid')
    id: string;

    @Column('varchar', { length: 256 })
    email: string;

    @Column('varchar', { length: 64 })
    passwordHashed: HashedPassword;

    @Column('varchar', { length: 64, nullable: true })
    username: string;

    @Column('varchar', { length: 64, nullable: true })
    display_name: string;

    @OneToMany(() => Jwt, (jwt) => jwt.user)
    tokens: Jwt[];

    @OneToMany(() => Game, (game) => game.creator)
    createdGames: Game[];

    @OneToMany(() => GameMembership, (game) => game.member)
    memberGames: GameMembership[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version = 0;
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: User });
