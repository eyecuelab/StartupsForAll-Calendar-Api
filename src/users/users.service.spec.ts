import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ormconfig } from '../database/ormconfig';
// import { User } from './user.entity';
import { UsersModule } from './users.module';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let connection: Connection;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UsersModule],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should get one', async () => {
  //   const result: Promise<User> = new Promise((resolve) => {
  //     resolve({
  //       id: '1',
  //       password: 'testpassword',
  //       hashPassword: () => new Promise((resolve) => resolve(null)),
  //       email: 'test@test.com',
  //       username: 'testuser',
  //     });
  //   });
  //   jest.spyOn(service, 'findOne').mockImplementation(async () => await result);
  //   expect(await service.findOne({ username: 'testuser' })).toBe(await result);
  // });
});
