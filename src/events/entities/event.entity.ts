import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CategoryText } from './CategoryText.enum';
import { Category } from './Category.enum';
import { Topics } from './Topics.enum';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  agenda?: string | null;

  @Column('text')
  audience?: string | null;

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
  creator_email?: string | null;

  @Column()
  creator_name?: string | null;

  @CreateDateColumn()
  created_at?: Date;

  @Column('text')
  location: string;

  @Column('simple-array')
  panelists?: string[] | null;

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
  end_date?: Date | null;

  @Column('text')
  start_time: string;

  @Column('text')
  end_time: string;
}
