import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { categoryText } from './CategoryText.enum';
import { Category } from './Category.enum';
import { Topics } from './Topics.enum';
@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Column({
  //     unique: true,
  //     nullable: true,
  // })
  // resetPasswordToken!: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  agenda?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  audience?: string;

  @Column()
  category: Category;

  @Column()
  category_text: categoryText;

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
    nullable: true,
  })
  description?: string;

  @Column('text')
  location: string;

  @Column({
    type: 'text',
    nullable: true,
  })
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

  @Column({
    type: 'boolean',
    nullable: true,
  })
  promoted?: true | false;

  @Column('text')
  summary?: string;

  @Column('text')
  title: string;

  @Column('simple-array')
  topics?: Topics[];

  @Column({
    type: 'text',
    nullable: true,
  })
  url: string;
}
