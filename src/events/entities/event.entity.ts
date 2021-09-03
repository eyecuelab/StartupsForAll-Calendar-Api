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

  @Column('text')
  event_link: string;

  @Column('text')
  ticket_link?: string;

  @Column('int')
  cost: number;

  @Column()
  category_text: categoryText;

  @Column('date')
  when: Date;

  @Column('text')
  where: string;
  // -> Physical address or Teleconference link

  @Column('text')
  who: string;
  // -> by or Referred by (name in brackets)

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
}
