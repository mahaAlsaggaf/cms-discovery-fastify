import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from '@db/entities/Series';
import { Episode } from '@db/entities/Episode';
import { BrowseController } from './browse.controller';
import { BrowseService } from './browse.service';

@Module({
  imports: [TypeOrmModule.forFeature([Series, Episode])],
  controllers: [BrowseController],
  providers: [BrowseService],
})
export class BrowseModule {}
