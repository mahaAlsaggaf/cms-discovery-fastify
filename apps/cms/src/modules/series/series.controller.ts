import { Body, Controller, Get, Post } from '@nestjs/common';
import { SeriesService } from './series.service';
import { Series } from '@db/entities/Series';

@Controller('series')
export class SeriesController {
  constructor(private readonly service: SeriesService) {}
  @Get() list(): Promise<Series[]> { return this.service.findAll(); }
  @Post() create(@Body() body: Partial<Series>) { return this.service.create(body); }
}
