import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatesCategoryAndCategoryTextEnums1631650561634 implements MigrationInterface {
  name = 'UpdatesCategoryAndCategoryTextEnums1631650561634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" integer NOT NULL`);
  }
}
