import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, Generated } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  uuid!: string;
  @CreateDateColumn({ type: 'timestamptz' }) createdAt!: Date;
  @UpdateDateColumn({ type: 'timestamptz' }) updatedAt!: Date;
}
