import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { categoryText } from './CategoryText.enum';
import { Category } from './Category.enum';
import { Topics } from './Topics.enum';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  agenda?: string;

  @Column('text')
  audience?: string;

  @Column()
  category: Category;

  @Column()
  category_text: categoryText;

  @Column('int')
  cost: number;

  @CreateDateColumn()
  created_at?: Date;

  @Column()
  creator_email?: string;

  @Column()
  creator_name?: string;

  @Column('text')
  description?: string;

  @Column('text')
  location: string;

  @Column('text')
  logo?: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('text')
  start_time: string;

  @Column('text')
  end_time: string;

  @Column('simple-array')
  panelists?: string[];

  @Column('boolean')
  promoted?: true | false;

  @Column('text')
  summary?: string;

  @Column('text')
  title: string;

  @Column('simple-array')
  topics?: Topics[];

  @Column('text')
  url: string;
}
