import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Episode } from './Episode';

@Entity('series')
export class Series extends BaseEntity {

  @Column({ type: 'varchar', length: 300 }) 
  title!: string;

  @Column({ type: 'text', nullable: true }) 
  description?: string;

  @Column({
    type: 'enum',
    enum: ['podcast', 'documentary']
  })
  type!: 'podcast' | 'documentary';

  @Column({default: ''})
  thumbnailUrl!: string;

  @Column()
  category!: string;

  @Column({
    type: 'enum',
    enum: ['ar', 'en']
  })
  language!: 'ar' | 'en';

  @OneToMany(() => Episode, (e) => e.series) episodes!: Episode[];
}