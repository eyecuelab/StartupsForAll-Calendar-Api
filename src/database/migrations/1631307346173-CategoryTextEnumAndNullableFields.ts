import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryTextEnumAndNullableFields1631307346173 implements MigrationInterface {
  name = 'CategoryTextEnumAndNullableFields1631307346173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`CREATE TYPE "event_category_enum" AS ENUM('Startups For All', 'Founders', 'Experts')`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" "event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`CREATE TYPE "event_category_text_enum" AS ENUM('StartupsForAll', 'Community')`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" "event_category_text_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`DROP TYPE "event_category_text_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" text`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`DROP TYPE "event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" text`);
  }
}
