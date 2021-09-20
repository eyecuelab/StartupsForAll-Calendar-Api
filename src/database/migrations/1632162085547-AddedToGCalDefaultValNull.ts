import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedToGCalDefaultValNull1632162085547 implements MigrationInterface {
  name = 'AddedToGCalDefaultValNull1632162085547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "in_google_cal" date, "category" character varying NOT NULL, "category_text" character varying NOT NULL, "cost" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "creator_email" text, "creator_name" text, "custom_blurb" text NOT NULL, "location" text NOT NULL, "logo" text, "start_date" date, "end_date" date, "promoted" boolean, "summary" text NOT NULL, "title" text NOT NULL, "topics" text NOT NULL, "url" text, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
