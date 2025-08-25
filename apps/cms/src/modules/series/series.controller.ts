import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SeriesService } from './series.service';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from '@db/entities/Series';

@ApiTags('Series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all series', 
    description: 'Retrieve all podcast series' 
  })
  @ApiResponse({ status: 200, description: 'List of all series', type: [Series] })
  async findAll(): Promise<Series[]> {
    return this.seriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get series by ID', 
    description: 'Retrieve a specific series by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Series ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Series found', type: Series })
  @ApiResponse({ status: 404, description: 'Series not found' })
  async findOne(@Param('id') id: string): Promise<Series> {
    return this.seriesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new series', 
    description: 'Create a new podcast series' 
  })
  @ApiResponse({ status: 201, description: 'Series created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createSeriesDto: CreateSeriesDto): Promise<Series> {
    return this.seriesService.create(createSeriesDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update series', 
    description: 'Update an existing series' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Series ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Series updated successfully', type: Series })
  @ApiResponse({ status: 404, description: 'Series not found' })
  async update(
    @Param('id') id: string, 
    @Body() updateSeriesDto: UpdateSeriesDto
  ): Promise<Series> {
    return this.seriesService.update(+id, updateSeriesDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete series', 
    description: 'Delete a series by ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Series ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Series deleted successfully' })
  @ApiResponse({ status: 404, description: 'Series not found' })
  async remove(@Param('id') id: string): Promise<{ deleted: boolean; message: string }> {
    return this.seriesService.remove(+id);
  }
}
