import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsEmail, IsInt, IsEnum, IsOptional, IsString, IsArray } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class EventsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  // @IsEnum(Category)
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  readonly category: Category;

  @ApiPropertyOptional()
  @IsEnum(CategoryText)
  @IsOptional()
  readonly category_text: CategoryText;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  readonly cost: number;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  readonly creator_email: string;

  @ApiPropertyOptional()
  readonly creator_name: string;

  @ApiPropertyOptional()
  readonly custom_blurb: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly in_google_cal: Date;

  @ApiPropertyOptional()
  readonly location: string;

  @ApiPropertyOptional()
  readonly logo: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly start_date: Date;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  readonly end_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  readonly promoted: boolean;

  @ApiPropertyOptional()
  readonly summary: string;

  @ApiPropertyOptional()
  readonly title: string;

  @ApiPropertyOptional()
  readonly topics: Topics[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly url: string;
}
