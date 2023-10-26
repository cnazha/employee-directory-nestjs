import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const MONGO_CONFIG_SCHEMA = {
  MONGO_HOST: Joi.string().default('localhost'),
  MONGO_PORT: Joi.number().default(27017),
  MONGO_USERNAME: Joi.string(),
  MONGO_PASSWORD: Joi.string(),
  MONGO_URI: Joi.string(),
};
export const MONGO_CONFIG = registerAs('mongo', () => ({
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT || 27017,
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  uri: process.env.MONGO_URI,
}));
