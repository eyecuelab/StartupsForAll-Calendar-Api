import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { categoryText } from './CategoryText.enum';
import { Category } from './Category.enum';
import { Topics } from './Topics.enum';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: Category;

  @Column()
  creator_email?: string;

  @Column()
  creator_name?: string;

  @Column('text')
  url: string;

  @Column('int')
  cost: number;

  @Column()
  category_text: categoryText;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('text')
  start_time: string;

  @Column('text')
  end_time: string;

  @Column('text')
  where: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column('simple-array')
  panelists?: string[];

  @Column('text')
  audience?: string;

  @Column('text')
  agenda?: string;

  @Column('simple-array')
  topics?: Topics[];

  @Column('boolean')
  promoted?: true | false;
}
