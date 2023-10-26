import * as Joi from 'joi';
import { APP_CONFIG, APP_CONFIG_SCHEMA } from './app.config';
import { MONGO_CONFIG, MONGO_CONFIG_SCHEMA } from './mongo.config';
import { REDIS_CONFIG, REDIS_CONFIG_SCHEMA } from './redis.config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

const ENV_CONFIG = [APP_CONFIG, MONGO_CONFIG, REDIS_CONFIG];
const ENV_CONFIG_SCHEMA = Joi.object({
  ...APP_CONFIG_SCHEMA,
  ...MONGO_CONFIG_SCHEMA,
  ...REDIS_CONFIG_SCHEMA,
});

export const envConfigOptions: ConfigModuleOptions = {
  load: ENV_CONFIG,
  validationSchema: ENV_CONFIG_SCHEMA,
  isGlobal: true,
  cache: true,
  expandVariables: true,
};
