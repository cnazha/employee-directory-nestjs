import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const MONGO_CONFIG_SCHEMA = {
  MONGO_URI: Joi.string(),
};
export const MONGO_CONFIG = registerAs('mongo', () => ({
  uri: process.env.MONGO_URI,
}));
