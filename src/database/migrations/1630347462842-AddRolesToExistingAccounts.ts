import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddRolesToExistingAccounts1630347462842 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ekPassword = await bcrypt.hash('eventKey', 10);
    const adminPassword = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO users (username, email, password, isAdmin) VALUES ('eventKey', 'eventKey@eventKey.net', '${ekPassword}', false)`
    );
    await queryRunner.query(
      `INSERT INTO users (username, email, password, isAdmin) VALUES ('admin', 'admin@admin.net', '${adminPassword}', true)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users`);
  }
}
