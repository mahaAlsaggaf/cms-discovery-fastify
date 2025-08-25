import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { EpisodesService } from './episodes.service';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from '@db/entities/Episode';

@ApiTags('Episodes')
@Controller('episodes')
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get all episodes', 
    description: 'Retrieve all published episodes' 
  })
  @ApiResponse({ status: 200, description: 'List of all episodes', type: [Episode] })
  async findAll(): Promise<Episode[]> {
    return this.episodesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get episode by ID', 
    description: 'Retrieve a specific episode by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Episode ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Episode found', type: Episode })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async findOne(@Param('id') id: string): Promise<Episode> {
    return this.episodesService.findOne(+id);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Create a new episode', 
    description: 'Create a new podcast episode for a series' 
  })
  @ApiResponse({ status: 201, description: 'Episode created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async create(@Body() createEpisodeDto: CreateEpisodeDto): Promise<Episode> {
    return this.episodesService.create(createEpisodeDto);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update episode', 
    description: 'Update an existing episode' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Episode ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Episode updated successfully', type: Episode })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async update(
    @Param('id') id: string, 
    @Body() updateEpisodeDto: UpdateEpisodeDto
  ): Promise<Episode> {
    return this.episodesService.update(+id, updateEpisodeDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete episode', 
    description: 'Delete an episode by ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Episode ID', 
    example: 1 
  })
  @ApiResponse({ status: 200, description: 'Episode deleted successfully' })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async remove(@Param('id') id: string): Promise<{ deleted: boolean; message: string }> {
    return this.episodesService.remove(+id);
  }
}
