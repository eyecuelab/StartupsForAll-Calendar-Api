import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseTitleInsteadOfUrlForUniqueAddOtherTopic1633062832600 implements MigrationInterface {
  name = 'UseTitleInsteadOfUrlForUniqueAddOtherTopic1633062832600';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TYPE "public"."event_topics_enum" RENAME TO "event_topics_enum_old"`);
    await queryRunner.query(
      `CREATE TYPE "public"."event_topics_enum" AS ENUM('💵 Funding / Financial', '☕️ Action Cafe', '🚀 Open Space', '🌎 Social Impact', '🧩 Strategy', '🔍 User Research', '🌱 Other')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."event" ALTER COLUMN "topics" TYPE "public"."event_topics_enum"[] USING "topics"::"text"::"public"."event_topics_enum"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."event_topics_enum_old"`);
    await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "g_cal_link"`);
    await queryRunner.query(`ALTER TABLE "public"."event" ADD "g_cal_link" text`);
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "google_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "public"."users" ADD "google_refresh_token" text`);
    await queryRunner.query(
      `UPDATE users SET google_refresh_token = '1//06xt8jyg1FVSfCgYIARAAGAYSNwF-L9IrJhYNoO1Miho2AWgIip41_YlgLt_ImdeTkxbTpzjJ4SFwAWDc3ZtzTOIOUPldTWC2zYM' WHERE username = 'admin'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "google_refresh_token"`);
    await queryRunner.query(`ALTER TABLE "public"."users" ADD "google_refresh_token" character varying`);
    await queryRunner.query(`ALTER TABLE "public"."event" DROP COLUMN "g_cal_link"`);
    await queryRunner.query(`ALTER TABLE "public"."event" ADD "g_cal_link" character varying`);
    await queryRunner.query(
      `CREATE TYPE "public"."event_topics_enum_old" AS ENUM('💵 Funding / Financial', '☕️ Action Cafe', '🚀 Open Space', '🌎 Social Impact', '🧩 Strategy', '🔍 User Research')`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."event" ALTER COLUMN "topics" TYPE "public"."event_topics_enum_old"[] USING "topics"::"text"::"public"."event_topics_enum_old"[]`
    );
    await queryRunner.query(`DROP TYPE "public"."event_topics_enum"`);
    await queryRunner.query(`ALTER TYPE "public"."event_topics_enum_old" RENAME TO "event_topics_enum"`);
  }
}
