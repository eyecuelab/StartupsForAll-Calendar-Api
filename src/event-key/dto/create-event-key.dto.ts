import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateEventKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
