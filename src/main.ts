import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('app.port');
  await app.listen(port);
}

bootstrap();
