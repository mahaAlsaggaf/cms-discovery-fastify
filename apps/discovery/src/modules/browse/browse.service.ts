import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Episode } from '@db/entities/Episode';
import { Series } from '@db/entities/Series';
import { PublicEpisodeListDto, PublicEpisodeDto } from './dto/public-episode.dto';
import { PublicSeriesListDto, PublicSeriesDto } from './dto/public-series.dto';

@Injectable()
export class BrowseService {
  constructor(
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
    @InjectRepository(Series) private readonly series: Repository<Series>,
  ) {}

  async listEpisodes(search?: string, limit = 20): Promise<PublicEpisodeListDto[]> {
    const qb = this.episodes.createQueryBuilder('e')
      .leftJoin('e.series', 's')
      .select([
        'e.episodeId AS e_id',
        'e.title AS e_title',
        'e."releaseDate" AS e_publishedAt',
        'e.duration AS e_durationSeconds',
        'e.avatar_url AS e_coverUrl',
        's.podcastId AS s_id',
        's.title AS s_title',
      ])
      .orderBy('e."releaseDate"', 'DESC')
      .take(limit);

    if (search) {
      const q = `%${search.toLowerCase()}%`;
      qb.andWhere('LOWER(e.title) LIKE :q', { q });
    }

    const rows = await qb.getRawMany();

    const data = rows.map((r: any) => ({
      id: r.e_id,
      title: r.e_title,
      summary: null,
      publishedAt: r.e_publishedAt ?? null,
      durationSeconds: r.e_durationSeconds ?? null,
      coverUrl: r.e_coverUrl ?? null,
      series: r.s_id ? { id: r.s_id, title: r.s_title } : null,
    }));

    return plainToInstance(PublicEpisodeListDto, data, { excludeExtraneousValues: true });
  }

  async getEpisode(id: string): Promise<PublicEpisodeDto | null> {
    const row = await this.episodes.createQueryBuilder('e')
      .leftJoin('e.series', 's')
      .select([
        'e.episodeId AS e_id',
        'e.title AS e_title',
        'e.number AS e_episodeNumber',
        'e."seasonNumber" AS e_seasonNumber',
        'e."episodeType" AS e_type',
        'e.duration AS e_durationSeconds',
        'e."releaseDate" AS e_publishedAt',
        'e."audioUrl" AS e_audioUrl',
        'e."videoUrl" AS e_videoUrl',
        'e.avatar_url AS e_coverUrl',
        'e."createdAt" AS e_createdAt',
        'e."updatedAt" AS e_updatedAt',
        's.podcastId AS s_id',
        's.title AS s_title',
      ])
      .where('e.episodeId = :id', { id })
      .getRawOne<any>();

    if (!row) return null;

    const obj = {
      episodeId: row.e_id,
      title: row.e_title,
      summary: null,
      episodeNumber: row.e_episodeNumber ?? null,
      seasonNumber: row.e_seasonNumber ?? null,
      type: row.e_type ?? null,
      durationSeconds: row.e_durationSeconds ?? null,
      publishedAt: row.e_publishedAt ?? null,
      audioUrl: row.e_audioUrl ?? null,
      videoUrl: row.e_videoUrl ?? null,
      coverUrl: row.e_coverUrl ?? null,
      createdAt: row.e_createdAt,
      updatedAt: row.e_updatedAt ?? null,
      series: row.s_id ? { id: row.s_id, title: row.s_title } : null,
    };

    return plainToInstance(PublicEpisodeDto, obj, { excludeExtraneousValues: true });
  }

  async listSeries(limit = 20): Promise<PublicSeriesListDto[]> {
    const rows = await this.series.createQueryBuilder('s')
      .select([
        's.podcastId AS id',
        's.title AS title',
        's."createdAt" AS createdAt',
        '(SELECT COUNT(*) FROM episodes e WHERE e."seriesId" = s.id) AS episodesCount',
      ])
      .orderBy('s."createdAt"', 'DESC')
      .take(limit)
      .getRawMany();

    const data = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      createdAt: r.createdAt,
      episodesCount: Number(r.episodescount ?? r.episodesCount ?? 0),
    }));

    return plainToInstance(PublicSeriesListDto, data, { excludeExtraneousValues: true });
  }

  async getSeries(id: string): Promise<PublicSeriesDto | null> {
    const s = await this.series.createQueryBuilder('s')
      .select([
        's.podcastId AS id',
        's.title AS title',
        's."createdAt" AS createdAt',
        's."updatedAt" AS updatedAt',
      ])
      .where('s.podcastId = :id', { id })
      .getRawOne<any>();

    if (!s) return null;

    const eps = await this.episodes.createQueryBuilder('e')
      .leftJoin('e.series', 'series')
      .select([
        'e.episodeId AS id',
        'e.title AS title',
        'e.number AS episodeNumber',
      ])
      .where('series.podcastId = :id', { id })
      .orderBy('e."number"', 'ASC')
      .getRawMany();

    return plainToInstance(PublicSeriesDto, { ...s, episodes: eps }, { excludeExtraneousValues: true });
  }
}
