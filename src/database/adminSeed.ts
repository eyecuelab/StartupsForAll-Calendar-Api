// import 'reflect-metadata';
// import { createConnection } from 'typeorm';
// import ormconfig from './ormconfig';
// import { User } from 'src/users/user.entity';
// import bcrypt from 'bcrypt';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// const createAdmin = async () => {
//   const unTyped: any = { ...ormconfig };
//   const postgresOrmConfig: PostgresConnectionOptions = unTyped;
//   const conn = await createConnection(postgresOrmConfig);
//   let admin = new User();
//   const password = await bcrypt.hash('admin', 10);
//   admin['password'] = password;
//   const users = conn.getRepository(User);
//   admin = await users.save(admin);
//   console.log('Created admin user with ID:', admin.id);
//   await conn.close();
// };

// createAdmin();
