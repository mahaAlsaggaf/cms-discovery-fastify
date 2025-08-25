import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Series } from '@db/entities/Series';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Series])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}
