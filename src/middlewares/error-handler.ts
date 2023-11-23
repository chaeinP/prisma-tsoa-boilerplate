import { ErrorResponsePayload } from '../common/error-response-payload';
import { Exception } from '../exceptions/Exception';
import { ErrorRequestHandler, RequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err: Error | Exception, req, res, next) => {
  let response = new ErrorResponsePayload(err);

  // 에러 응답 로깅 추가
  res.status(response.statusCode).send(response);
};
