import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateEventEnums1631124736532 implements MigrationInterface {
  name = 'updateEventEnums1631124736532';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`CREATE TYPE "event_category_enum" AS ENUM('Founders', 'Experts', 'Startups For All')`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "category" "event_category_enum" NOT NULL DEFAULT 'Startups For All'`
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`CREATE TYPE "event_category_text_enum" AS ENUM('SFA', 'Independent')`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "category_text" "event_category_text_enum" NOT NULL DEFAULT 'SFA'`
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "topics"`);
    await queryRunner.query(
      `CREATE TYPE "event_topics_enum" AS ENUM('💵 Funding / Financial', '☕️ Action Cafe', '🚀 Open Space', '🌎 Social Impact', '🧩 Strategy', '🔍 User Research')`
    );
    await queryRunner.query(`ALTER TABLE "event" ADD "topics" "event_topics_enum" array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "topics"`);
    await queryRunner.query(`DROP TYPE "event_topics_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "topics" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`DROP TYPE "event_category_text_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`DROP TYPE "event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" integer NOT NULL`);
  }
}
