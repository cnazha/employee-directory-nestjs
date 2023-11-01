import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  if (process.env.NODE_ENV === 'production') {
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            imgSrc: [
              `'self'`,
              'data:',
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            manifestSrc: [
              `'self'`,
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
          },
        },
      }),
    );
  }
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('app.port');
  await app.listen(port);
}

bootstrap();
