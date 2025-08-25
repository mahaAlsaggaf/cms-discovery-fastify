import { Column, Entity, OneToMany, Generated } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Episode } from './Episode';

@Entity('series')
export class Series extends BaseEntity {
  @Column({ type: 'uuid', unique: true })
  @Generated('uuid')
  podcastId!: string;

  @Column({default: 0})
  duration!: number;

  @Column({
    type: 'enum',
    enum: ['ar', 'en']
  })
  language!: 'ar' | 'en';

  @Column({
    type: 'enum',
    enum: ['podcast', 'documentary']
  })
  type!: 'podcast' | 'documentary';

  @Column({ nullable: true })
  websiteUrl?: string;

  @Column({ nullable: true })
  orgName?: string;

  @Column({ default: 0 })
  seasons!: number;

  @OneToMany(() => Episode, e => e.series, {
    cascade: false,                   
    orphanedRowAction: 'delete',
  })
  episodes!: Episode[];
}