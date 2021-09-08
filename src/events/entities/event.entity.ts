import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { CategoryText } from './CategoryText.enum';
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

  @Column({
    type: 'enum',
    enum: Category,
    default: Category.SFA,
  })
  category: Category;

  @Column()
  creator_email?: string;

  @Column()
  creator_name?: string;

  @Column('text')
  url: string;

  @Column('int')
  cost: number;

  @Column({
    type: 'enum',
    enum: CategoryText,
    default: CategoryText.SFA,
  })
  category_text: CategoryText;

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

  @Column({
    type: 'enum',
    enum: Topics,
    array: true,
    default: null,
    nullable: true,
  })
  topics?: Topics[];

  @Column('boolean')
  promoted?: true | false;
}
