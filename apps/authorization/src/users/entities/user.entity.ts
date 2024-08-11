import { encryptPassword, isPassEncrypted, UserType } from '@app/helper';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UrlAccess } from '../../urls/entities/access.entity';
import { Url } from '../../urls/entities/url.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password?: string;

  @Column({ enum: UserType, default: UserType.USER })
  type: string;

  @OneToMany(() => Url, (url) => url.creator)
  urls?: Url[];

  @OneToMany(() => UrlAccess, (url) => url.user)
  accesses?: UrlAccess[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @BeforeInsert()
  @BeforeUpdate()
  encryptPassword() {
    if (this.password && !isPassEncrypted(this.password)) {
      this.password = encryptPassword(this.password);
    }
  }

}
