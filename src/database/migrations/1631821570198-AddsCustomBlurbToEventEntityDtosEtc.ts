import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsCustomBlurbToEventEntityDtosEtc1631821570198 implements MigrationInterface {
  name = 'AddsCustomBlurbToEventEntityDtosEtc1631821570198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "custom_blurb" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "custom_blurb"`);
  }
}
