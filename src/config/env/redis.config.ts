import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const REDIS_CONFIG = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD,
}));
export const REDIS_CONFIG_SCHEMA = {
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string(),
};
