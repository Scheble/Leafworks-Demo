import { validationResult } from 'express-validator';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import cache from '../cache';
import {
  REQUEST_GLOBAL_LIMIT,
  REQUEST_GLOBAL_LIMIT_KEY,
  REQUEST_LIMIT_TTL,
  REQUEST_USER_LIMIT,
  REQUEST_USER_LIMIT_KEY,
} from '../constants';

const validateRequest = (req, _, next) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw createHttpError(
      StatusCodes.BAD_REQUEST,
      result
        .array()
        .map(({ location, msg, path }) => `${location}: ${msg} for ${path}`)
        .join(' - '),
      { expose: true }
    );
  }
  next();
};

const validateRequestLimits = async (key, limit) => {
  const count = +((await cache.get(key)) || 0);

  if (count + 1 > limit) {
    throw createHttpError(
      StatusCodes.TOO_MANY_REQUESTS,
      'Request limit reached.',
      { expose: true }
    );
  }
  await cache.set(key, count + 1, REQUEST_LIMIT_TTL);
};

const validateGlobalRequestLimits = async (req, res, next) => {
  await validateRequestLimits(REQUEST_GLOBAL_LIMIT_KEY, REQUEST_GLOBAL_LIMIT);
  next();
};

const validateUserRequestLimits = async (req, res, next) => {
  const userId = req.headers['user-id'];
  await validateRequestLimits(
    `${REQUEST_USER_LIMIT_KEY}:${userId}`,
    REQUEST_USER_LIMIT
  );
  next();
};

export {
  validateRequest,
  validateGlobalRequestLimits,
  validateUserRequestLimits,
};
