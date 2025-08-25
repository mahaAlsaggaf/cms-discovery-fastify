import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateSeriesDto {
  @ApiProperty({
    description: 'Series title',
    example: 'فنجان مع عبدالرحمن أبومالح '
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: 'Series description',
    example: '<p>كل يوم أحد. ضيف معي أنا عبدالرحمن أبومالح. في بودكاست فنجان، سنأخذ من كل مذاق رشفة. لا معايير، ولا مواضيع محددة، لكن الأكيد، هنا كثير من المتعة والفائدة.</p>'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Type of series',
    enum: ['podcast', 'documentary'],
    example: 'podcast'
  })
  @IsEnum(['podcast', 'documentary'])
  type!: 'podcast' | 'documentary';

  @ApiProperty({
    description: 'Series language',
    enum: ['ar', 'en'],
    example: 'ar'
  })
  @IsEnum(['ar', 'en'])
  language!: 'ar' | 'en';

  @ApiProperty({
    description: 'Total duration of series in seconds',
    example: 2069676,
    default: 0
  })
  @IsNumber()
  @Type(() => Number)
  duration!: number;

  @ApiPropertyOptional({
    description: 'Avatar URL',
    example: 'https://files.hosting.thmanyah.com/images/episodes/1714293283816-5742.jpg'
  })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'Website URL',
    example: 'https://example.com'
  })
  @IsOptional()
  @IsUrl()
  websiteUrl?: string;

  @ApiPropertyOptional({
    description: 'Organization name',
    example: 'Thmanyah'
  })
  @IsOptional()
  @IsString()
  orgName?: string;

  @ApiProperty({
    description: 'Number of seasons',
    example: 0,
    default: 0
  })
  @IsNumber()
  @Type(() => Number)
  seasons!: number;
}
