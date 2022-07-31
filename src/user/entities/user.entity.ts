import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { NoteEntity } from '../../note/entities/note.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column({ unique: true, type: 'text' })
  username: string;

  @Column({ unique: true, type: 'text' })
  email: string;

  @Column('boolean', { default: false })
  active: boolean;

  @Column('text')
  passwordHash: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @OneToMany(() => NoteEntity, (note) => note.user, {
    cascade: true,
  })
  notes: NoteEntity[];

  password: string;

  @BeforeInsert()
  async setPassword(): Promise<void> {
    if (this.password) {
      this.passwordHash = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeInsert()
  toLowercase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
