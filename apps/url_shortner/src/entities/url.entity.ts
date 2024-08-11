import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../../authorization/src/users/entities/user.entity';
import { UrlAccess } from './access.entity';


@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    originalUrl: string;

    @Column()
    shortUrl: string;

    @Column({ default: true, type: 'boolean' })
    isPublic: boolean;

    @ManyToOne(() => User, (user) => user.urls)
    creator?: User;

    @OneToMany(() => UrlAccess, (access) => access.url)
    accesses: UrlAccess[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}