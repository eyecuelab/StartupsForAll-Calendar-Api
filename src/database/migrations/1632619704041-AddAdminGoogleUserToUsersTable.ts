import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddAdminGoogleUserToUsersTable1632619704041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO users (username, email, password, is_admin) VALUES ('adminGoogle', 'google_test@test.com', '${password}', true)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'google_test@test.com'`);
  }
}
