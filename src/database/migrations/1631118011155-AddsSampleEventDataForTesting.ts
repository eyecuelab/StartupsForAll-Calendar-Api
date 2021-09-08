import { MigrationInterface, QueryRunner } from 'typeorm';
import { Topics } from 'src/events/entities/Topics.enum';
import { Category } from 'src/events/entities/Category.enum';
import { CategoryText } from 'src/events/entities/CategoryText.enum';

export class AddsSampleEventDataForTesting1631118011155 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO event (title, description, category, creator_name, url, cost, category_text, start_date, end_date, start_time, end_time, location, topics, promoted) VALUES ('People and Power: Advancing Leadership', 'Join us in an Open Space event to explore the theme of People and Power--Advancing Leadership. Co-hosted by the Future of Work meetup group.', '${Category.StartupsForAll}', 'Susan Liao', 'https://www.eventbrite.com/e/people-and-power-advancing-leadership-an-open-space-event-tickets-165969600543?aff=ebdsoporgprofile#', 0, '${CategoryText.StartupsForAll}', '2021-08-21', '2021-08-21', '16:00', '18:00', 'Online', '${Topics.Funding}', false)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE event`);
  }
}
