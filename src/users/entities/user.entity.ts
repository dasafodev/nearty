import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'nearty_user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;
}
