import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGoogleRefreshTokenPropertyToUser1632606335683 implements MigrationInterface {
  name: 'AddGoogleRefreshTokenPropertyToUser1632606335683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "google_refresh_token" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "google_refresh_token" text`);
  }
}
