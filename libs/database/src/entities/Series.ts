import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Episode } from './Episode';

@Entity('series')
export class Series extends BaseEntity {
  @Column({ type: 'varchar', length: 300 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @OneToMany(() => Episode, (e) => e.series) episodes!: Episode[];
}
