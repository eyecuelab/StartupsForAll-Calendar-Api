import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CategoryText } from './CategoryText.enum';
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

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @Column({
    type: 'enum',
    enum: CategoryText,
  })
  category_text: CategoryText;

  @Column('int')
  cost: number;

  @Column()
  creator_email?: string;

  @Column()
  creator_name?: string;

  @CreateDateColumn()
  created_at?: Date;

  @Column('text')
  location: string;

  @Column('simple-array')
  panelists?: string[];

  @Column('boolean')
  promoted?: true | false;

  @Column('text')
  title: string;

  @Column('simple-array')
  topics?: Topics[];

  @Column('text')
  url: string;

  @Column('date')
  start_date: Date;

  @Column('date')
  end_date: Date;

  @Column('text')
  start_time: string;

  @Column('text')
  end_time: string;
}
