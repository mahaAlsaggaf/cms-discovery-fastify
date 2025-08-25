import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { BrowseService } from './browse.service';
import { PublicEpisodeDto, PublicEpisodeListDto } from './dto/public-episode.dto';
import { PublicSeriesDto, PublicSeriesListDto } from './dto/public-series.dto';
import { SearchQueryDto, PaginationQueryDto } from './dto/query.dto';

@ApiTags('Browse')
@Controller('browse')
export class BrowseController {
  constructor(private readonly service: BrowseService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Search episodes', 
    description: 'Search for episodes by title' 
  })
  @ApiResponse({ status: 200, description: 'Episodes found', type: [PublicEpisodeListDto] })
  async list(@Query() query: SearchQueryDto): Promise<PublicEpisodeListDto[]> {
    const limit = query.limit ?? 20;
    return this.service.listEpisodes(query.q, limit);
  }

  @Get('episodes')
  @ApiOperation({ 
    summary: 'Get episodes', 
    description: 'Retrieve a list of episodes' 
  })
  @ApiResponse({ status: 200, description: 'Episodes retrieved', type: [PublicEpisodeListDto] })
  async findAllEpisodes(@Query() query: PaginationQueryDto): Promise<PublicEpisodeListDto[]> {
    const limit = query.limit ?? 20;
    return this.service.listEpisodes(undefined, limit);
  }

  @Get('episodes/:id')
  @ApiOperation({ 
    summary: 'Get episode by ID', 
    description: 'Retrieve a specific episode by its ID' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Episode ID (UUID)', 
    example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' 
  })
  @ApiResponse({ status: 200, description: 'Episode found', type: PublicEpisodeDto })
  @ApiResponse({ status: 404, description: 'Episode not found' })
  async findOneEpisode(@Param('id') id: string): Promise<PublicEpisodeDto> {
    const episode = await this.service.getEpisode(id);
    if (!episode) throw new NotFoundException(`Episode with ID ${id} not found`);
    return episode;
  }

  @Get('series')
  @ApiOperation({ 
    summary: 'Get series', 
    description: 'Retrieve a list of series' 
  })
  @ApiResponse({ status: 200, description: 'Series retrieved', type: [PublicSeriesListDto] })
  async findAllSeries(@Query() query: PaginationQueryDto): Promise<PublicSeriesListDto[]> {
    const limit = query.limit ?? 20;
    return this.service.listSeries(limit);
  }

  @Get('series/:id')
  @ApiOperation({ 
    summary: 'Get series by ID', 
    description: 'Retrieve a specific series with its episodes' 
  })
  @ApiParam({ 
    name: 'id', 
    description: 'Series ID (UUID)', 
    example: 'ba15a12e-f003-52a3-9dc0-dc675d6db010' 
  })
  @ApiResponse({ status: 200, description: 'Series found', type: PublicSeriesDto })
  @ApiResponse({ status: 404, description: 'Series not found' })
  async findOneSeries(@Param('id') id: string): Promise<PublicSeriesDto> {
    const series = await this.service.getSeries(id);
    if (!series) throw new NotFoundException(`Series with ID ${id} not found`);
    return series;
  }
}
