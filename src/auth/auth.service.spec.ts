import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ormconfig } from '../database/ormconfig';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Connection } from 'typeorm';

describe('AuthService', () => {
  let service: AuthService;
  let connection: Connection;

  beforeAll(async () => {
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

    service = module.get<AuthService>(AuthService);
    connection = module.get(getConnectionToken());
  });

  afterAll(async (done) => {
    await connection.close();
    done();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
