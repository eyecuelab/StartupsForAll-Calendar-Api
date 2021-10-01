import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsOrganizerToEventEntity1633063831412 implements MigrationInterface {
  name = 'AddsOrganizerToEventEntity1633063831412';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."event" ADD "organizer" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "organizer"`);
  }
}
