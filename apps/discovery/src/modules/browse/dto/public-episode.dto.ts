import { IsString, IsOptional, IsNumber, IsUrl, IsEnum, IsDateString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SeriesRefDto } from './public-series.dto';

export class PublicEpisodeListDto {
  @ApiProperty({ description: 'Episode id', example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' })
  @IsString()
  @Expose()
  id!: string;

  @ApiProperty({ description: 'Title', example: 'الجزائر: تاريخ مختطف' })
  @IsString()
  @Expose()
  title!: string;

  @ApiPropertyOptional({ description: 'Short summary' })
  @IsOptional()
  @IsString()
  @Expose()
  summary?: string;

  @ApiPropertyOptional({ description: 'Duration in seconds', example: 2730 })
  @IsOptional()
  @IsNumber()
  @Expose()
  durationSeconds?: number;

  @ApiPropertyOptional({ description: 'Cover image URL' })
  @IsOptional()
  @IsUrl()
  @Expose()
  coverUrl?: string;

  @ApiPropertyOptional({ description: 'Series', type: SeriesRefDto })
  @IsOptional()
  @Type(() => SeriesRefDto)
  @Expose()
  series?: SeriesRefDto | null;
}

export class PublicEpisodeDto extends PublicEpisodeListDto {
  @ApiPropertyOptional({ description: 'Episode number', example: 346 })
  @IsOptional()
  @IsNumber()
  @Expose()
  episodeNumber?: number;

  @ApiPropertyOptional({ description: 'Season number', example: 5 })
  @IsOptional()
  @IsNumber()
  @Expose()
  seasonNumber?: number;

  @ApiPropertyOptional({ enum: ['full', 'trailer', 'bonus'], description: 'Episode type' })
  @IsOptional()
  @IsEnum(['full', 'trailer', 'bonus'])
  @Expose()
  type?: 'full' | 'trailer' | 'bonus';

  @ApiPropertyOptional({ description: 'Audio URL' })
  @IsOptional()
  @IsUrl()
  @Expose()
  audioUrl?: string;

  @ApiPropertyOptional({ description: 'Video URL' })
  @IsOptional()
  @IsUrl()
  @Expose()
  videoUrl?: string;

  @ApiProperty({ description: 'Created at (ISO string)' })
  @IsDateString()
  @Expose()
  createdAt!: string;

  @ApiPropertyOptional({ description: 'Updated at (ISO string)' })
  @IsOptional()
  @IsDateString()
  @Expose()
  updatedAt?: string;
}
