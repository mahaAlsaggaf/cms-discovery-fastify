import { Column, Entity, ManyToOne, Index, BeforeUpdate, BeforeInsert } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Series } from './Series';

@Entity('episodes')
export class Episode extends BaseEntity {
  @Index()
  @Column({ type: 'varchar', length: 300 }) 
  title!: string;

  @Column({ type: 'text', nullable: true }) 
  description?: string;

  @Column()
  videoUrl!: string;

  @Column({default: ''})
  thumbnailUrl!: string;

  @Column({default: 0})
  durationInSeconds!: number;

  @Column()
  episodeNumber!: number;

  @Column({default: false})
  isPublished!: boolean;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date;
  
  @ManyToOne(() => Series, (s) => s.episodes, { onDelete: 'CASCADE' }) series!: Series;
}
