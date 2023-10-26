import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Get port from config

  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('app.port');
  await app.listen(port);
}

bootstrap();
