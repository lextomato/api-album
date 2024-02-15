import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('videos')
export class VideoEntity {
  @PrimaryColumn('int')
  id: number;

  @Column('varchar', { length: 200 })
  videoId: string;

  @Column('varchar', { length: 200, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar', { length: 100, nullable: true })
  img: string;

  @Column('varchar', { length: 30, nullable: true })
  duration: string;
}
