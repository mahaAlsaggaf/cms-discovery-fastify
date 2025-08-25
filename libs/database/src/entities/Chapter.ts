import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => Episode, (episode) => episode.chapters, { onDelete: 'CASCADE' })
  episode!: Episode;
}
