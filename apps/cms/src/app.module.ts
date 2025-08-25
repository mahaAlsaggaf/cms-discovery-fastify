import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@common/app-config.module';
import { SeriesModule } from './modules/series/series.module';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { ChaptersModule } from './modules/chapters/chapters.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import databaseConfig from '@common/database.config';


@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('database');
        if (!dbConfig) {
          throw new Error('Database configuration not found');
        }
        return dbConfig;
      },
    }),
    SeriesModule,
    EpisodesModule,
    ChaptersModule
  ],
})
export class AppModule {}
