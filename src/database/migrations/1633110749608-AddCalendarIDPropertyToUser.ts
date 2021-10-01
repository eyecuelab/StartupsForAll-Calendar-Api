import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCalendarIDPropertyToUser1633110749608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "calendar_id" character varying`);
    await queryRunner.query(`UPDATE users SET calendar_id = 'primary' WHERE username = 'admin'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "calendar_id" character varying`);
  }
}
