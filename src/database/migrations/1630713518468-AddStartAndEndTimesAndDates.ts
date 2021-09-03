import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartAndEndTimesAndDates1630713518468 implements MigrationInterface {
  name = 'AddStartAndEndTimesAndDates1630713518468';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "event_link"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "ticket_link"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "when"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "who"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "url" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "start_date" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "end_date" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "start_time" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "end_time" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_date"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_date"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "url"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "who" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "when" date NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "ticket_link" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "event_link" text NOT NULL`);
  }
}
