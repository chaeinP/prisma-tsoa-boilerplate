import httpStatus from 'http-status';
import { FieldErrors, ValidateError } from 'tsoa';

import { env } from '../config/env';
import { Exception } from '../exceptions/Exception';

export class ErrorResponsePayload {
  result: 'FAILED';
  statusCode: number;
  message: string;
  details?: FieldErrors;
  stack?: string;

  constructor(err: Error | Exception | ValidateError) {
    this.result = 'FAILED';

    // logical error
    if (err instanceof Exception) {
      const { statusCode, message, stack } = err.getter();
      this.statusCode = statusCode;
      this.message = message;
      if (env.node_env !== 'prod') this.stack = stack;
    }
    // tsoa validation error
    else if (err instanceof ValidateError) {
      this.statusCode = err.status;
      this.message = err.message;
      this.details = err.fields;
      if (env.node_env !== 'prod') this.stack = err.stack;
    }
    // physical error
    else {
      this.statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      this.message = httpStatus[500];
      if (env.node_env !== 'prod') this.stack = err.stack;
    }
  }
}
