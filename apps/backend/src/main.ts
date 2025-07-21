import * as dotenv from 'dotenv';
dotenv.config({
  debug: process.env.NODE_ENV !== 'prod',
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';

async function getApplicationInstance(): Promise<INestApplication<any>> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173'],
  });
  app.setGlobalPrefix('/api');
  app.use(helmet());
  return app;
}

async function bootstrap() {
  const app = await getApplicationInstance();
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}
bootstrap();
