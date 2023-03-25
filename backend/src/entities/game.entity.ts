import {
    Column,
    CreateDateColumn,
    Entity,
    Generated,
    PrimaryColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import Container from 'typedi';
import { EntityToken } from './base';

@Entity()
export class Game {
    constructor(props: Partial<Game>) {
        Object.assign(this, props);
    }

    @PrimaryColumn()
    @Generated('uuid')
    id: string;
    
    @Column('varchar', { length: 128 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @VersionColumn()
    version = 0;
}

// Inject so we can retrieve this model when we create the connection.
// The syntax here is weird because we need the _class_, not an instance.
Container.set({ id: EntityToken, multiple: true, value: Game });