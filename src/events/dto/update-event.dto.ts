import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { category, categoryText } from '../entities/event.entity';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly category: category[];

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
  readonly category_text: categoryText[];

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  readonly when: Date;

  @ApiProperty()
  @IsNotEmpty()
  readonly where: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly who: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly panelists: string;

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
