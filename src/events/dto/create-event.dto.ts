import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsUrl, IsEnum } from 'class-validator';
import { category } from './../eventCategory.enum';
import { categoryText } from './../eventCategoryText.enum';

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(category)
  readonly category: category;

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
  readonly tags: string[];
}
