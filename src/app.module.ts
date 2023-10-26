import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfigOptions, mongooseConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfigOptions),
    MongooseModule.forRootAsync(mongooseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
