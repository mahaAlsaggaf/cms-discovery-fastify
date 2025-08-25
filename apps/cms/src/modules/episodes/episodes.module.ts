import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Episode } from '@db/entities/Episode';
import { EpisodesService } from './episodes.service';
import { EpisodesController } from './episodes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Episode])],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
