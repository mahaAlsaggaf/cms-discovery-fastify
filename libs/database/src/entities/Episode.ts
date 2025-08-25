import { Column, Entity, ManyToOne, OneToMany, Index, Generated } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Series } from './Series';
import { Chapter } from './Chapter';

@Entity('episodes')
export class Episode extends BaseEntity {
  @Index()

  @Column({type: 'uuid', unique: true})
  @Generated('uuid')
  episodeId!: string;

  @Column({type: 'int', generated: 'increment' })
  number!: number;

  @Column({type: 'int', default: -1 })
  seasonNumber!: number;

  @Column({ 
    type: 'enum',
    enum: ['full', 'trailer', 'bonus'],
    default: 'full'
  })
  episodeType!: 'full' | 'trailer' | 'bonus';

  @Column({ nullable: true })
  audioUrl?: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ type: 'timestamp' })
  releaseDate!: Date;

  @Column({ type: 'varchar', length: 200, nullable: true })
  authorName?: string;

  @Column({default: 0})
  duration!: number;
  
  @ManyToOne(() => Series, (s) => s.episodes, { onDelete: 'CASCADE' }) 
  series!: Series;

  @OneToMany(() => Chapter, (chapter: Chapter) => chapter.episode, { cascade: true })
  chapters!: Chapter[];
}
