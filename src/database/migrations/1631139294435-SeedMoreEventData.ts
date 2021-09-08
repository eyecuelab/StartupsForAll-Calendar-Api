import { MigrationInterface, QueryRunner } from 'typeorm';
import { Category } from 'src/events/entities/Category.enum';
import { CategoryText } from 'src/events/entities/CategoryText.enum';
import { Topics } from 'src/events/entities/Topics.enum';

export class SeedMoreEventData1631139294435 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO event (title, description, category, creator_name, url, cost, category_text, start_date, end_date, start_time, end_time, location, topics, promoted) VALUES ('Founders Showcase - Cohort 2', 'Join us for our FOUNDERS SHOWCASE celebrating the #stories + #wins of 11 self-funded founders on a mission to #makeadifference in the world!', '${Category.StartupsForAll}', 'Susan Liao', 'https://www.eventbrite.com/e/founders-showcase-tickets-160045617751?aff=ebdsoporgprofile#', 0, '${CategoryText.StartupsForAll}', '2021-06-25', '2021-06-25', '16:00', '18:00', 'Online', '${Topics.SocialImpact}', false)`
    );
    await queryRunner.query(
      `INSERT INTO event (title, description, category, creator_name, url, cost, category_text, start_date, end_date, start_time, end_time, location, topics, promoted) VALUES ('Co-creation Action Café - Strategy Tuesdays', 'The intention for this time is to hold space for co-creation and group/peer reflection to advance progress towards our strategic goals. Join us and not only will you gain clarity on your strategic priorities, but you''ll also feel more connected to the community, come away happier and more fulfilled when you leave the session than when you started!', '${Category.StartupsForAll}', 'Susan Liao', 'https://zoom.us/j/95273266241?pwd=MjhVUVRzaEszeERDZ2tPVHBvQXNmdz09', 0, '${CategoryText.StartupsForAll}', '2021-09-14', '2021-09-14', '12:30', '13:30', 'https://zoom.us/j/95273266241?pwd=MjhVUVRzaEszeERDZ2tPVHBvQXNmdz09', '${Topics.ActionCafe}', false)`
    );
    await queryRunner.query(
      `INSERT INTO event (title, description, category, creator_name, url, cost, category_text, start_date, end_date, start_time, end_time, location, topics, promoted) VALUES ('Action Café - Financial Fridays', 'The intention for this time is to help advance progress towards our financial and money goals. Join us and not only will you crush your to-do list, but you''ll also feel more connected to the community, come away happier and more fulfilled when you leave the session than when you started!', '${Category.StartupsForAll}', 'Susan Liao', 'https://zoom.us/j/94544786490?pwd=RlZjdFphQ1ZVemxrNlRqYStpNWpsdz09', 0, '${CategoryText.StartupsForAll}', '2021-09-24', '2021-09-24', '10:00', '11:00', 'https://zoom.us/j/94544786490?pwd=RlZjdFphQ1ZVemxrNlRqYStpNWpsdz09', '${Topics.ActionCafe}, ${Topics.Funding}', false)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE TABLE event`);
  }
}
