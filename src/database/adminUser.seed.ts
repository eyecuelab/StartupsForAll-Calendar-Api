// import { Factory, Seeder } from 'typeorm-seeding';
// import { Connection } from 'typeorm';
// import bcrypt from 'bcrypt';
// import { User } from './../users/user.entity';

// const generateAdminUser = async () => {
//   const username = 'admin';
//   const password = await bcrypt.hash('admin', 10);
//   const email = 'admin@admin.net';
//   const adminUser = new User();
//   adminUser.username = username;
//   adminUser.password = password;
//   adminUser.email = email;
//   return adminUser;
// };

// export default class CreateAdminUser implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     const adminUser = await generateAdminUser();
//     await connection.createQueryBuilder().insert().into(User).values(adminUser).execute();
//   }
// }
