import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Series } from './entities/Series';
import { Episode } from './entities/Episode';
import { Chapter } from './entities/Chapter';

const isTrue = (v?: string) => String(v).toLowerCase() === 'true';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'cms-content',
  ssl: isTrue(process.env.DB_SSL) ? { rejectUnauthorized: false } : false,
  entities: [Series, Episode, Chapter],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
  logging: false,
});

export default AppDataSource;

