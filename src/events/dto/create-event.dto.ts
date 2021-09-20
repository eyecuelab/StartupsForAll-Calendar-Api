import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  readonly addedToGoogleCalendar: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CategoryText)
  readonly category_text: CategoryText;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly creator_email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly creator_name: string;

  @ApiProperty()
  readonly custom_blurb?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  @IsOptional()
  readonly logo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly end_date: Date;

  @ApiProperty()
  @IsOptional()
  readonly promoted?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  readonly summary: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly topics: Topics[];

  @ApiProperty()
  @IsOptional()
  readonly url?: string;
}
