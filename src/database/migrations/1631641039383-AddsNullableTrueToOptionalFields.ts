import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddsNullableTrueToOptionalFields1631641039383 implements MigrationInterface {
  name = 'AddsNullableTrueToOptionalFields1631641039383';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "where"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "location" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "agenda" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "audience" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "category" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "category_text" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_email"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_email" text`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_name"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_name" text`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "description" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "summary" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "url" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "url" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "summary" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "description" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_name"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_email"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_email" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "category_text" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "category" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "audience" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ALTER COLUMN "agenda" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "location"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "where" text NOT NULL`);
  }
}
