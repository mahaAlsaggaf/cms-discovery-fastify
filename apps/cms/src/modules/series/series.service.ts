import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from '@db/entities/Series';

@Injectable()
export class SeriesService {
  constructor(@InjectRepository(Series) private repo: Repository<Series>) {}
  findAll() { return this.repo.find(); }
  create(data: Partial<Series>) { return this.repo.save(this.repo.create(data)); }
}
