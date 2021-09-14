import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class CreateEventDto {
  @ApiProperty()
  readonly agenda?: string;

  @ApiProperty()
  readonly audience?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CategoryText)
  readonly category_text: CategoryText;

  @ApiProperty()
  @IsInt()
  readonly cost?: number;

  @ApiProperty()
  @IsEmail()
  readonly creator_email?: string;

  @ApiProperty()
  readonly creator_name?: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  readonly logo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ApiProperty()
  @IsDateString()
  readonly end_date?: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty()
  readonly panelists?: string[];

  @ApiProperty()
  readonly promoted?: boolean;

  @ApiProperty()
  readonly summary: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly topics: Topics[];

  @ApiProperty()
  @IsUrl()
  readonly url?: string;
}
