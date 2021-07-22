import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

@Entity('users')
class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid()
        }
    }
}

export { UserEntity }