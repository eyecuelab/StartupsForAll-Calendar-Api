import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTopicsToEventEntity1630708187717 implements MigrationInterface {
  name = 'AddTopicsToEventEntity1630708187717';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_email" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "event" ADD "creator_name" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_name"`);
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "creator_email"`);
  }
}
