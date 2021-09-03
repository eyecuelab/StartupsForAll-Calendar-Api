import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTopicsCategoryColsToTypedEnum1630686665032 implements MigrationInterface {
  name = 'UpdateTopicsCategoryColsToTypedEnum1630686665032';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "category" integer NOT NULL, "event_link" text NOT NULL, "ticket_link" text NOT NULL, "cost" integer NOT NULL, "category_text" integer NOT NULL, "when" date NOT NULL, "where" text NOT NULL, "who" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "panelists" text NOT NULL, "audience" text NOT NULL, "agenda" text NOT NULL, "topics" text NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_admin" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "is_admin" DROP NOT NULL`);
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
