import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UrlAccess } from './access.entity';


@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    originalUrl: string;

    @Column()
    shortUrl: string;

    @ManyToOne(() => User, (user) => user.urls)
    creator?: User;

    @OneToMany(() => UrlAccess, (access) => access.url)
    accesses: UrlAccess[];
}