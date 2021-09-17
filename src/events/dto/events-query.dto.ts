import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsInt, IsNotEmpty, IsEnum } from 'class-validator';
import { Category } from '../entities/Category.enum';
import { CategoryText } from '../entities/CategoryText.enum';
import { Topics } from '../entities/Topics.enum';

export class EventsQueryDto {
  @ApiProperty()
  readonly agenda?: string;

  @ApiProperty()
  readonly audience?: string;

  @ApiProperty()
  readonly category?: Category;

  @ApiProperty()
  readonly category_text?: CategoryText;

  @ApiProperty()
  readonly cost?: number;

  @ApiProperty()
  readonly creator_email?: string;

  @ApiProperty()
  readonly creator_name?: string;

  @ApiProperty()
  readonly custom_blurb?: string;

  @ApiProperty()
  readonly description?: string;

  @ApiProperty()
  readonly location?: string;

  @ApiProperty()
  readonly logo?: string;

  @ApiProperty()
  readonly start_date?: Date;

  @ApiProperty()
  readonly end_date?: Date;

  @ApiProperty()
  readonly start_time?: string;

  @ApiProperty()
  readonly end_time?: string;

  @ApiProperty()
  readonly panelists?: string[];

  @ApiProperty()
  readonly promoted?: boolean;

  @ApiProperty()
  readonly summary?: string;

  @ApiProperty()
  readonly title?: string;

  @ApiProperty()
  readonly topics?: Topics[];

  @ApiProperty()
  readonly url?: string;
}
