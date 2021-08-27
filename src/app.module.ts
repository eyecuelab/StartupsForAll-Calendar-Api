import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ormconfig } from './database/ormconfig';
import { EventsModule } from './events/events.module';
import { EventKeyModule } from './event-key/event-key.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    EventsModule,
    EventKeyModule,
  ],
})
export class AppModule {}
