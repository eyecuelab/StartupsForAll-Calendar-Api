import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventsMigration1629752187810 implements MigrationInterface {
  name = 'EventsMigration1629752187810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "category" integer NOT NULL, "event_link" text NOT NULL, "ticket_link" text NOT NULL, "cost" integer NOT NULL, "category_text" integer NOT NULL, "when" date NOT NULL, "where" text NOT NULL, "who" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "panelists" text NOT NULL, "audience" text NOT NULL, "agenda" text NOT NULL, "tags" text NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
