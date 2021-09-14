import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLogoUrlField1631637753318 implements MigrationInterface {
  name = 'AddLogoUrlField1631637753318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "logo" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "summary" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "agenda" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "audience" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(`DROP TYPE "public"."event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`DROP TYPE "public"."event_category_text_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "creator_email" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "panelists" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "panelists" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "creator_email" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category_text"`);
    await queryRunner.query(`CREATE TYPE "public"."event_category_text_enum" AS ENUM('StartupsForAll', 'Community')`);
    await queryRunner.query(`ALTER TABLE "event" ADD "category_text" "event_category_text_enum"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
    await queryRunner.query(
      `CREATE TYPE "public"."event_category_enum" AS ENUM('Startups For All', 'Founders', 'Experts')`
    );
    await queryRunner.query(`ALTER TABLE "event" ADD "category" "event_category_enum"`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "audience" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "agenda" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "summary"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "logo"`);
  }
}
