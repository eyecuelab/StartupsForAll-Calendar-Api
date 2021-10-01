import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';
import { Unique } from 'typeorm';

@Unique('events_constraints', ['start_date', 'end_date', 'url'])
export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEnum(CategoryText)
  readonly category_text: CategoryText;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsInt()
  readonly cost: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  readonly creator_email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly creator_name: string;

  @ApiPropertyOptional()
  readonly custom_blurb?: string;

  @ApiPropertyOptional()
  @IsDateString()
  readonly in_google_cal: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly location: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly logo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly organizer?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsDateString()
  readonly end_date: Date;

  @ApiPropertyOptional()
  @IsOptional()
  readonly promoted?: boolean;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly summary: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  readonly topics: Topics[];

  @ApiPropertyOptional()
  @IsOptional()
  readonly url?: string;
}
