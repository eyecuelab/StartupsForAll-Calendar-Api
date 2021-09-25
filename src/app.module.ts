import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ormconfig } from './database/ormconfig';
import { EventsModule } from './events/events.module';
import { EventbriteModule } from './eventbrite/eventbrite.module';
import { AdminGoogleModule } from './google/google.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    EventsModule,
    EventbriteModule,
    AdminGoogleModule,
  ],
})
export class AppModule {}
