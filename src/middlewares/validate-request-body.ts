import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RequestHandler } from 'express';
import { BadRequestException } from '../common/exceptions/BadRequestException';

export function validateRequestBody(type: any): RequestHandler {
  return async (req, res, next) => {
    try {
      const errors = await validate(plainToInstance(type, req.body), { skipMissingProperties: false });

      if (errors.length > 0) {
        const message = Object.values(errors[0].constraints!)[0];
        throw new BadRequestException(message);
      }

      req.body = plainToInstance(type, req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
}
