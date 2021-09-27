import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTopicsToEnum1632522630141 implements MigrationInterface {
  name = 'updateTopicsToEnum1632522630141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from "public"."event"`);
    await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "topics"`);
    await queryRunner.query(
      `CREATE TYPE "public"."event_topics_enum" AS ENUM('💵 Funding / Financial', '☕️ Action Cafe', '🚀 Open Space', '🌎 Social Impact', '🧩 Strategy', '🔍 User Research')`
    );
    await queryRunner.query(`ALTER TABLE "public"."event" ADD "topics" "public"."event_topics_enum" array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "topics"`);
    await queryRunner.query(`DROP TYPE "public"."event_topics_enum"`);
    await queryRunner.query(`ALTER TABLE "public"."event" ADD "topics" text NOT NULL`);
  }
}
