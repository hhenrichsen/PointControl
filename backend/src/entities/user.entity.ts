import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';
import { Jwt } from './jwt.entity';
import { HashedPassword } from '../types/password';

@Entity()
export class User {
    constructor(props: Partial<User>) {
        Object.assign(this, props);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 256, unique: true })
    email: string;

    @Column('varchar', { length: 128 })
    passwordHashed: HashedPassword;

    @Column('varchar', { length: 64, nullable: true, unique: true })
    username: string;

    @OneToMany(() => Jwt, (jwt) => jwt.user)
    tokens: Jwt[];

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
