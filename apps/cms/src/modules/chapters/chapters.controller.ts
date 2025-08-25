import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { Chapter } from '@db/entities/Chapter';

@ApiTags('Chapters')
@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all chapters', 
    description: 'Retrieve all chapters' 
  })
  @ApiResponse({ status: 200, description: 'List of all chapters', type: [Chapter] })
  async findAll(): Promise<Chapter[]> {
    return this.chaptersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get chapter by ID', 
    description: 'Retrieve a specific chapter by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Chapter ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Chapter found', type: Chapter })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  async findOne(@Param('id') id: string): Promise<Chapter> {
    return this.chaptersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new chapter', 
    description: 'Create a new chapter for an episode' 
  })
  @ApiResponse({ status: 201, description: 'Chapter created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createChapterDto: CreateChapterDto): Promise<Chapter> {
    return this.chaptersService.create(createChapterDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update chapter', 
    description: 'Update an existing chapter' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Chapter ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Chapter updated successfully', type: Chapter })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  async update(
    @Param('id') id: string, 
    @Body() updateChapterDto: UpdateChapterDto
  ): Promise<Chapter> {
    return this.chaptersService.update(+id, updateChapterDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete chapter', 
    description: 'Delete a chapter by ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Chapter ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Chapter deleted successfully' })
  @ApiResponse({ status: 404, description: 'Chapter not found' })
  async remove(@Param('id') id: string): Promise<{ deleted: boolean; message: string }> {
    return this.chaptersService.remove(+id);
  }
}
