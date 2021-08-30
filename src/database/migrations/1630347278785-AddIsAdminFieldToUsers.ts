import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsAdminFieldToUsers1630347278785 implements MigrationInterface {
  name = 'AddIsAdminFieldToUsers1630347278785';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "isAdmin" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isAdmin"`);
  }
}
