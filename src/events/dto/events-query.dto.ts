import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class EventsQueryDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsBoolean()
  readonly addedToGoogleCalendar: boolean;

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
  @IsNotEmpty()
  readonly location: string;

  @ApiPropertyOptional()
  @IsOptional()
  readonly logo?: string;

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
