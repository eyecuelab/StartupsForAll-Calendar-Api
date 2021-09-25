import { Module } from '@nestjs/common';
import { AdminGoogleService } from './google.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  exports: [AdminGoogleService],
  providers: [UsersService, AdminGoogleService],
})
export class AdminGoogleModule {}
