import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '@db/entities/Chapter';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private repo: Repository<Chapter>,
  ) { }
  
  findAll() { 
    return this.repo.find({ 
      relations: ['episode'] 
    }); 
  }

  async findOne(id: number){
    const chapter = await this.repo.findOne({
      where: { id },
      relations: ['episode'],
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return chapter;
  }

  create(createChapterDto: CreateChapterDto) { 
    return this.repo.save(this.repo.create(createChapterDto)); 
  }

  async update(id: number, updateChapterDto: UpdateChapterDto){
    const chapter = await this.findOne(id);

    Object.assign(chapter, updateChapterDto);

    return await this.repo.save(chapter);
  }

  async remove(id: number) {
    const chapter = await this.findOne(id);

    await this.repo.remove(chapter);

    return {
      deleted: true,
      message: `Chapter '${chapter.title}' has been deleted successfully`,
    };
  }
}
