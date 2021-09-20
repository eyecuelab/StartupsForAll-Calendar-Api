import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class EventsQueryDto {
  @IsOptional()
  @ApiProperty()
  readonly agenda?: string;

  @IsOptional()
  @ApiProperty()
  readonly audience?: string;

  @IsOptional()
  @ApiProperty()
  readonly category?: Category;

  @IsOptional()
  @ApiProperty()
  readonly category_text?: CategoryText;

  @IsOptional()
  @ApiProperty()
  readonly cost?: number;

  @IsOptional()
  @ApiProperty()
  readonly creator_email?: string;

  @IsOptional()
  @ApiProperty()
  readonly creator_name?: string;

  @IsOptional()
  @ApiProperty()
  readonly custom_blurb?: string;

  @IsOptional()
  @ApiProperty()
  readonly description?: string;

  @IsOptional()
  @ApiProperty()
  readonly location?: string;

  @IsOptional()
  @ApiProperty()
  readonly logo?: string;

  @IsOptional()
  @ApiProperty()
  readonly start_date?: Date;

  @IsOptional()
  @ApiProperty()
  readonly end_date?: Date;

  @IsOptional()
  @ApiProperty()
  readonly start_time?: string;

  @IsOptional()
  @ApiProperty()
  readonly end_time?: string;

  @IsOptional()
  @ApiProperty()
  readonly panelists?: string[];

  @IsOptional()
  @ApiProperty()
  readonly promoted?: boolean;

  @IsOptional()
  @ApiProperty()
  readonly summary?: string;

  @IsOptional()
  @ApiProperty()
  readonly title?: string;

  @IsOptional()
  @ApiProperty()
  readonly topics?: Topics[];

  @IsOptional()
  @ApiProperty()
  readonly url?: string;
}
