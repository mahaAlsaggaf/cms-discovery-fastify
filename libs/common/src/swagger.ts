import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, name: string, path = 'docs') {
  const config = new DocumentBuilder().setTitle(`${name} API`).setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
