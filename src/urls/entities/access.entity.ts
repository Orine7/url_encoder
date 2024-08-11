import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Url } from './url.entity';

@Entity()
export class UrlAccess {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Url, (url) => url.accesses)
    url: Url;

    @Column()
    accessDate: Date;

    @Column()
    ipAddress: string;

    @Column()
    user: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}