import { Body, Controller, Get, Post } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { Episode } from '@db/entities/Episode';

@Controller('episodes')
export class EpisodesController {
  constructor(private readonly service: EpisodesService) {}
  @Get() list(): Promise<Episode[]> { return this.service.findAll(); }
  @Post() create(@Body() body: Partial<Episode>) { return this.service.create(body); }
}
