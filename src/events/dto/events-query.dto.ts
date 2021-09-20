import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class EventsQueryDto {
  @ApiProperty()
  @IsOptional()
  readonly agenda?: string;

  @ApiProperty()
  @IsOptional()
  readonly audience?: string;

  @ApiProperty()
  @IsOptional()
  readonly category?: Category;

  @ApiProperty()
  @IsOptional()
  readonly category_text?: CategoryText;

  @ApiProperty()
  @IsOptional()
  readonly cost?: number;

  @ApiProperty()
  @IsOptional()
  readonly creator_email?: string;

  @ApiProperty()
  @IsOptional()
  readonly creator_name?: string;

  @ApiProperty()
  @IsOptional()
  readonly custom_blurb?: string;

  @ApiProperty()
  @IsOptional()
  readonly description?: string;

  @ApiProperty()
  @IsOptional()
  readonly location?: string;

  @ApiProperty()
  @IsOptional()
  readonly logo?: string;

  @ApiProperty()
  @IsOptional()
  readonly start_date?: Date;

  @ApiProperty()
  @IsOptional()
  readonly end_date?: Date;

  @ApiProperty()
  @IsOptional()
  readonly start_time?: string;

  @ApiProperty()
  @IsOptional()
  readonly end_time?: string;

  @ApiProperty()
  @IsOptional()
  readonly panelists?: string[];

  @ApiProperty()
  @IsOptional()
  readonly promoted?: boolean;

  @ApiProperty()
  @IsOptional()
  readonly summary?: string;

  @ApiProperty()
  @IsOptional()
  readonly title?: string;

  @ApiProperty()
  @IsOptional()
  readonly topics?: Topics[];

  @ApiProperty()
  @IsOptional()
  readonly url?: string;
}
