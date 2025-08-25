import { Controller, Get, Query } from '@nestjs/common';
import { BrowseService } from './browse.service';

@Controller('browse')
export class BrowseController {
  constructor(private readonly service: BrowseService) {}
  @Get() list(@Query('q') q?: string) { return this.service.list(q); }
}
