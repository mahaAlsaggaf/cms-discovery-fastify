import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Index, JoinColumn } from 'typeorm';
import { Episode } from './Episode';

@Entity('chapters')
export class Chapter {
  @PrimaryGeneratedColumn() 
  id!: number;
  
  @Column({ type: 'int' })
  start!: number;

  @Column({ type: 'varchar', length: 300 })
  title!: string;

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Index()
  @Column()
  episodeId!: number;

  @ManyToOne(() => Episode, e => e.chapters, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'episodeId' })
  episode!: Episode;

}
