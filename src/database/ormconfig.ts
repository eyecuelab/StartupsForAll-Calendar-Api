import * as path from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const env = process.env.NODE_ENV || 'dev';
const dotenv_path = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: dotenv_path });
console.log('here I am', env);
if (result.error) {
  /* do nothing */
}

const entities = env === 'test' ? [`src/**/*.entity.ts`] : ['dist/**/*.entity.js'];
const migrations = env === 'test' ? [`src/database/migrations/*.ts`] : ['dist/database/migrations/*.js'];

export const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  entities,
  migrations,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: env !== 'test',
  synchronize: env === 'test',
  logger: 'advanced-console',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default ormconfig;
