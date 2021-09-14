import { MigrationInterface, QueryRunner } from 'typeorm';

export class MakeEndDateNullableForSingleDayEvents1631649690600 implements MigrationInterface {
  name = 'MakeEndDateNullableForSingleDayEvents1631649690600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "end_date" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "panelists" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "panelists" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "end_date" SET NOT NULL`);
  }
}
