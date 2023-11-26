import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequestException } from '../common/exceptions/bad-request-exception';

export function validateRequestBody(type: any): RequestHandler {
  return async (req, res, next) => {
    try {
      const errors = await validate(plainToInstance(type, req.body), { skipMissingProperties: false });

      if (errors.length > 0) {
        const message = getMessage(errors[0]);
        throw new BadRequestException(message);
      }

      req.body = plainToInstance(type, req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}

export function getMessage(error: ValidationError) {
  if (!error.constraints) return getMessage(error.children![0]);
  return Object.values(error.constraints!)[0];
}
