import { ErrorResponsePayload } from '../common/responses/error-response-payload';
import { Exception } from '../common/exceptions/exception';
import { ErrorRequestHandler, NextFunction } from 'express';
import { ValidateError } from 'tsoa';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: Error | Exception, req, res, next: NextFunction) => {
  console.log(err);

  const statusCode =
    err instanceof Exception ? err.getter().statusCode : err instanceof ValidateError ? err.status : 500;
  const response = new ErrorResponsePayload(err);

  res.status(statusCode).send(response);
};
