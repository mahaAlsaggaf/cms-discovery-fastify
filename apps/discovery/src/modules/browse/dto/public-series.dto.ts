import { IsString, IsOptional, IsNumber, IsArray, IsDateString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SeriesRefDto {
  @ApiProperty({ description: 'Series id', example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' })
  @IsString()
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Series title', example: 'فنجان' })
  @IsString()
  @Expose()
  title!: string;
}

export class PublicSeriesListDto {
  @ApiProperty({ description: 'Series id', example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' })
  @IsString()
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Series title', example: 'فنجان' })
  @IsString()
  @Expose()
  title!: string;

  @ApiProperty({ description: 'Created at (ISO string)' })
  @IsDateString()
  @Expose()
  createdAt!: string;

  @ApiProperty({ description: 'Total episodes', example: 354 })
  @IsNumber()
  @Expose()
  episodesCount!: number;
}

export class SeriesEpisodeLiteDto {
  @ApiProperty({ description: 'Episode id', example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' })
  @IsString()
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Episode title', example: 'الجزائر: تاريخ مختطف' })
  @IsString()
  @Expose()
  title!: string;

  @ApiProperty({ description: 'Episode number', example: 346, required: false })
  @IsOptional()
  @IsNumber()
  @Expose()
  episodeNumber?: number;
}

export class PublicSeriesDto {
  @ApiProperty({ description: 'Series id', example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' })
  @IsString()
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Series title', example: 'فنجان' })
  @IsString()
  @Expose()
  title!: string;

  @ApiProperty({ description: 'Created at (ISO string)' })
  @IsDateString()
  @Expose()
  createdAt!: string;

  @ApiPropertyOptional({ description: 'Updated at (ISO string)' })
  @IsOptional()
  @IsDateString()
  @Expose()
  updatedAt?: string;

  @ApiProperty({ description: 'Episodes', type: [SeriesEpisodeLiteDto] })
  @IsArray()
  @Type(() => SeriesEpisodeLiteDto)
  @Expose()
  episodes!: SeriesEpisodeLiteDto[];
}
