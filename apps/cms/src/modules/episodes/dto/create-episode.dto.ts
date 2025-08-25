import { IsString, IsOptional, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsUrl, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateChapterDto } from '../../chapters/dto/create-chapter.dto';

export class CreateEpisodeDto {
  @ApiProperty({
    description: 'Episode title',
    example: 'الجزائر: تاريخ مختطف'
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Episode description',
    example: '<p class="ql-direction-rtl"><span style="background-color: transparent; color: rgb(0, 0, 0);">هذه الحلقة عن بلد المليون ونصف شهيد، عن تاريخ الجزائر قبل الاستعمار ومقاومتها الطويلة حتى استقلالها، سرد ممتع مع ضيف غزير المعرفة وواسع الاطلاع على ما حدث في الجزائر.&nbsp;</span></p>',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Episode number in series (auto-incremented if not provided)',
    example: 346
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  number?: number;

  @ApiProperty({
    description: 'Season number',
    example: -1,
    default: -1
  })
  @IsNumber()
  @Type(() => Number)
  seasonNumber!: number;

  @ApiProperty({
    description: 'Episode type',
    enum: ['full', 'trailer', 'bonus'],
    example: 'full'
  })
  @IsEnum(['full', 'trailer', 'bonus'])
  episodeType!: 'full' | 'trailer' | 'bonus';

  @ApiPropertyOptional({
    description: 'Audio URL',
    example: 'https://api.hosting.thmanyah.com/episodeAudioFile/4198/file.mp3'
  })
  @IsOptional()
  @IsUrl()
  audioUrl?: string;

  @ApiPropertyOptional({
    description: 'Video URL',
    example: 'https://api.hosting.thmanyah.com/episodeVideoFile/4198/file.m3u8'
  })
  @IsOptional()
  @IsUrl()
  videoUrl?: string;

  @ApiProperty({
    description: 'Episode release date',
    example: '2024-10-06T03:00:46.000Z'
  })
  @IsNotEmpty()
  @IsDateString()
  releaseDate!: string;

  @ApiPropertyOptional({
    description: 'Author name',
    example: 'ثمانية/ thmanyah'
  })
  @IsOptional()
  @IsString()
  authorName?: string;

  @ApiProperty({
    description: 'Total duration in seconds',
    example: 15349,
    default: 0
  })
  @IsNumber()
  @Type(() => Number)
  duration!: number;

  @ApiPropertyOptional({
    description: 'Episode chapters',
    type: [CreateChapterDto]
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateChapterDto)
  chapters?: CreateChapterDto[];

  @ApiProperty({
    description: 'ID of the series this episode belongs to',
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  seriesId!: number;
}
