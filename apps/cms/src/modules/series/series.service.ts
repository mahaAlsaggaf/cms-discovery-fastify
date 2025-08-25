import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from '@db/entities/Series';
import { CreateSeriesDto } from './dto/create-series.dto';
import { UpdateSeriesDto } from './dto/update-series.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private repo: Repository<Series>,
  ) { }
  
  findAll() { 
    return this.repo.find({ 
      relations: ['episodes'] 
    }); 
  }

  async findOne(id: number){
    const series = await this.repo.findOne({
      where: { id },
      relations: ['episodes'],
    });

    if (!series) {
      throw new NotFoundException(`Series with ID ${id} not found`);
    }

    return series;
  }

  create(createSeriesDto: CreateSeriesDto) { 
    return this.repo.save(this.repo.create(createSeriesDto)); 
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto){
    const series = await this.findOne(id);

    Object.assign(series, updateSeriesDto);

    return await this.repo.save(series);
  }

  async remove(id: number) {
    const series = await this.findOne(id);

    await this.repo.remove(series);

    return {
      deleted: true,
      message: `Series '${series.title}' has been deleted successfully`,
    };
  }
}
