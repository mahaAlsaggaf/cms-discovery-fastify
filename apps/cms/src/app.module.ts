import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@common/app-config.module';
import { Series } from '@db/entities/Series';
import { Episode } from '@db/entities/Episode';
import { Chapter } from '@db/entities/Chapter';
import { SeriesModule } from './modules/series/series.module';
import { EpisodesModule } from './modules/episodes/episodes.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        ssl: (String(process.env.DB_SSL).toLowerCase() === 'true') ? { rejectUnauthorized: false } : false,
        entities: [Series, Episode, Chapter],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    SeriesModule,
    EpisodesModule,
  ],
})
export class AppModule {}
