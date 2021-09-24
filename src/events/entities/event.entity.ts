import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';
import { CategoryText } from './CategoryText.enum';
import { Category } from './Category.enum';
import { Topics } from './Topics.enum';
@Entity('event')
@Unique('events_constraints', ['start_date', 'end_date', 'url'])
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  category: Category;

  @Column()
  category_text: CategoryText;

  @Column('int')
  cost: number;

  @CreateDateColumn()
  created_at?: Date;

  @Column({
    type: 'text',
    nullable: true,
  })
  creator_email?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  creator_name?: string;

  @Column({
    type: 'text',
  })
  custom_blurb?: string;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  in_google_cal: Date;

  @Column('text')
  location: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  logo?: string;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  start_date: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  end_date: Date;

  @Column({
    type: 'boolean',
    nullable: true,
  })
  promoted?: true | false;

  @Column('text')
  summary: string;

  @Column('text')
  title: string;

  @Column('simple-array')
  topics: Topics[];

  @Column({
    type: 'text',
    nullable: true,
  })
  url?: string;
}
