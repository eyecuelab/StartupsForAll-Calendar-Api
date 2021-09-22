import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsUniqueClassDecorator1632170330914 implements MigrationInterface {
  name = 'AddsUniqueClassDecorator1632170330914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "events_constraints" UNIQUE ("start_date", "end_date", "url")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "events_constraints"`);
  }
}
