import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsUrl } from 'class-validator';

export class EventBriteEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly created: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly changed: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly currency: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly summary: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly end: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
