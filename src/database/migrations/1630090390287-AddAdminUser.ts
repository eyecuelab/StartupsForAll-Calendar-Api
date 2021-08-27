import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class AddAdminUser1630090390287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin', 10);
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@admin.net', '${password}');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM users WHERE email = 'admin@admin.net';`);
  }
}
