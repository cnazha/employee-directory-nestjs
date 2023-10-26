import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { envConfigOptions, mongooseConfig } from './config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { graphqlConfig } from './config/graphql.config';

@Module({
  imports: [
    ConfigModule.forRoot(envConfigOptions),
    MongooseModule.forRootAsync(mongooseConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
