import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGCalLinkPropertyToEvent1632943922008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD COLUMN "g_cal_link" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "g_cal_link" character varying`);
  }
}
