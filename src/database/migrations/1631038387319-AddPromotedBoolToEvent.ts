import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPromotedBoolToEvent1631038387319 implements MigrationInterface {
  name = 'AddPromotedBoolToEvent1631038387319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "promoted" boolean NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "promoted"`);
  }
}
