import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginViaEventKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
