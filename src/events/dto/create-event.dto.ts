import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { categoryText } from '../entities/CategoryText.enum';
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
  readonly event_link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  readonly ticket_link: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  readonly cost: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(categoryText)
  readonly category_text: categoryText;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  readonly when: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly where: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly who: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly panelists: string[];

  @ApiProperty()
  @IsNotEmpty()
  readonly audience: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly agenda: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly topics: Topics[];
}
