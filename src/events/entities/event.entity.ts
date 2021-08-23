import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type category = 'Startups For All' | 'Founder' | 'Expert' | 'Community';
export type categoryText =
  | 'This is a Startups for All / SfA Community Event.'
  | 'This is an external event independently managed and operated by one of SfA’s guest experts.';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'set',
    enum: ['Startups For All', 'Founder', 'Expert', 'Community'],
  })
  category: category[];

  @Column('text')
  event_link: string;

  @Column('text')
  ticket_link?: string;

  @Column('int')
  cost: number;

  @Column({
    type: 'set',
    enum: [
      'This is a Startups for All / SfA Community Event.',
      'This is an external event independently managed and operated by one of SfA’s guest experts.',
    ],
  })
  category_text: categoryText[];

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
  tags?: string[];
  // (optional) -> can be keywords or emoji(s)
  // TODO change me into an enum?
}
