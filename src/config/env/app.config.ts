import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const APP_CONFIG_SCHEMA = {
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_NAME: Joi.string().default('NestJS'),
};

export const APP_CONFIG = registerAs('app', () => ({
  name: process.env.APP_NAME,
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
}));
