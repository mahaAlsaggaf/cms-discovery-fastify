import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChapterDto {
  @ApiProperty({
    description: 'Chapter start time in seconds',
    example: 181
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  start!: number;

  @ApiProperty({
    description: 'Chapter title',
    example: 'لماذا الجزائريون أقل الناس تدوينًا'
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Chapter URL',
    example: null,
    required: false
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({
    description: 'Chapter image URL',
    example: null,
    required: false
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}
