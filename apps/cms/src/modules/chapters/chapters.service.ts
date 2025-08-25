import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chapter } from '@db/entities/Chapter';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectRepository(Chapter)
    private repo: Repository<Chapter>,
  ) { }
  
  findAll() { 
    return this.repo.find(); 
  }

  async findOne(id: number){
    const chapter = await this.repo.findOne({
      where: { id }
    });

    if (!chapter) {
      throw new NotFoundException(`Chapter with ID ${id} not found`);
    }

    return chapter;
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
