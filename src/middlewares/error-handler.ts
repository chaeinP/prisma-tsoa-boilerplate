import { ErrorResponsePayload } from '../common/responses/error-response-payload';
import { Exception } from '../common/exceptions/Exception';
import { ErrorRequestHandler, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err: Error | Exception, req, res, next: NextFunction) => {
  const response = new ErrorResponsePayload(err);

  res.status(response.data.statusCode).send(response);
};
