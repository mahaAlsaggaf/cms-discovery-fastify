import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Episode } from '@db/entities/Episode';

@Injectable()
export class BrowseService {
  constructor(@InjectRepository(Episode) private repo: Repository<Episode>) {}
  list(q?: string) {
    if (!q) return this.repo.find({ take: 50, relations: ['series'] });
    return this.repo.find({ where: { title: ILike(`%${q}%`) }, take: 50, relations: ['series'] });
  }
}
