import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from '@db/entities/Episode';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private repo: Repository<Episode>,
  ) { }
  
  findAll() { 
    return this.repo.find({ 
      relations: ['series'] 
    }); 
  }

  async findOne(id: number){
    const episode = await this.repo.findOne({
      where: { id },
      relations: ['series'],
    });

    if (!episode) {
      throw new NotFoundException(`Episode with ID ${id} not found`);
    }

    return episode;
  }

  create(createEpisodeDto: CreateEpisodeDto) { 
    return this.repo.save(this.repo.create(createEpisodeDto)); 
  }

  async update(id: number, updateEpisodeDto: UpdateEpisodeDto){
    const episode = await this.findOne(id);

    Object.assign(episode, updateEpisodeDto);

    return await this.repo.save(episode);
  }

  async remove(id: number) {
    const episode = await this.findOne(id);

    await this.repo.remove(episode);

    return {
      deleted: true,
      message: `Episode '${episode.title}' has been deleted successfully`,
    };
  }
}
