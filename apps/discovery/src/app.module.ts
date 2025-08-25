import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '@common/app-config.module';
import { BrowseModule } from './modules/browse/browse.module';
import { SearchModule as SearchLibModule } from '@search/search.module';
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
    SearchLibModule,
    BrowseModule,
  ],
})
export class AppModule {}
