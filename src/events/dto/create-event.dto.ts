import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @ApiProperty()
  @IsEmail()
  readonly creator_email: string;

  @ApiProperty()
  readonly creator_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  @ApiProperty()
  @IsInt()
  readonly cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(CategoryText)
  readonly category_text: CategoryText;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ApiProperty()
  @IsDateString()
  readonly end_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  readonly panelists: string[];

  @ApiProperty()
  readonly audience: string;

  @ApiProperty()
  readonly agenda: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly topics: Topics[];
}
