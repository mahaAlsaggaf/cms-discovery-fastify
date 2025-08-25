import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '@db/entities/Episode';

@Injectable()
export class EpisodesService {
  constructor(@InjectRepository(Episode) private repo: Repository<Episode>) {}
  findAll() { return this.repo.find({ relations: ['series'] }); }
  create(data: Partial<Episode>) { return this.repo.save(this.repo.create(data)); }
}
