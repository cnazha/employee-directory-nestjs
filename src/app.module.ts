import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { envConfigOptions } from './config';

@Module({
  imports: [ConfigModule.forRoot(envConfigOptions)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
