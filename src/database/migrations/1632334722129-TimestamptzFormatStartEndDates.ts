import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimestamptzFormatStartEndDates1632334722129 implements MigrationInterface {
  name = 'TimestamptzFormatStartEndDates1632334722129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "events_constraints"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "start_date" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "end_date" TIMESTAMP WITH TIME ZONE`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "events_constraints" UNIQUE ("start_date", "end_date", "url")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "events_constraints"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "end_date" date`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "start_date" date`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "events_constraints" UNIQUE ("start_date", "end_date", "url")`
    );
  }
}
