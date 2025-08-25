import { Column, Entity, ManyToOne, Index } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Series } from './Series';

@Entity('episodes')
export class Episode extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 300 }) title!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @ManyToOne(() => Series, (s) => s.episodes, { onDelete: 'CASCADE' }) series!: Series;
}
