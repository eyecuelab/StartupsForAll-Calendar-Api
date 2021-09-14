import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogoUrlField1631637753318 implements MigrationInterface {
  name = 'AddLogoUrlField1631637753318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "logo" text`);
    await queryRunner.query(`ALTER TABLE "event" ADD "summary" text`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" integer`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" "event_category_text_enum"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" "event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "summary"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "logo"`);
  }
}
