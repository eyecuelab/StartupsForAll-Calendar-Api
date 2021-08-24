import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import ormconfig from '../database/ormconfig';
import { Connection } from 'typeorm';

describe('AuthController', () => {
  let authController: AuthController;
  let connection: Connection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '../../.env.test',
        }),
        TypeOrmModule.forRoot(ormconfig),
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: { expiresIn: configService.get('JWT_TIMEOUT') },
          }),
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
      exports: [AuthService],
      controllers: [AuthController],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
