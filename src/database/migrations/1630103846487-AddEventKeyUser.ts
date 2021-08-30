import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddEventKeyUser1630103846487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('eventKey', 10);
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('eventKey', 'eventKey@eventKey.net', '${password}')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'eventKey@eventKey.net'`);
  }
}
