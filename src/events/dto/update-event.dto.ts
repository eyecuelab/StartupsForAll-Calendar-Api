import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsEnum, IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { Category } from '../entities/Category.enum';
import { categoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty()
  readonly agenda: string;

  @ApiProperty()
  readonly audience: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Category)
  readonly category: Category;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(categoryText)
  readonly category_text: categoryText;

  @ApiProperty()
  @IsInt()
  readonly cost: number;

  @ApiProperty()
  @IsEmail()
  readonly creator_email: string;

  @ApiProperty()
  readonly creator_name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly location: string;

  @ApiProperty()
  readonly logo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly start_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly end_date: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly start_time: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly end_time: string;

  @ApiProperty()
  readonly panelists: string[];

  @ApiProperty()
  readonly promoted: boolean;

  @ApiProperty()
  readonly summary: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly topics: Topics[];

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;
}
