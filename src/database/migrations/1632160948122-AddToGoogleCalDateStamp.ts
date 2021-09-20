import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddToGoogleCalDateStamp1632160948122 implements MigrationInterface {
  name = 'AddToGoogleCalDateStamp1632160948122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "panelists"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "audience"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "agenda"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "start_time"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "end_time"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "addedToGoogleCalendar" date`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "custom_blurb" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "start_date" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "start_date" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "custom_blurb" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "addedToGoogleCalendar"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "end_time" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "start_time" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "agenda" text`);
    await queryRunner.query(`ALTER TABLE "event" ADD "audience" text`);
    await queryRunner.query(`ALTER TABLE "event" ADD "panelists" text`);
    await queryRunner.query(`ALTER TABLE "event" ADD "description" text`);
  }
}
