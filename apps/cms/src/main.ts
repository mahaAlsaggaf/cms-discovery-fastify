import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from 'fastify-helmet';
import compress from 'fastify-compress';
import { AppModule } from './app.module';
import { setupSwagger } from '@common/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  app.register(helmet as any);
  app.register(compress as any);
  setupSwagger(app, 'CMS');
  const port = +(process.env.CMS_PORT || 3001);
  await app.listen(port, '0.0.0.0');
  console.log(`CMS running on http://localhost:${port}`);
}
bootstrap();
