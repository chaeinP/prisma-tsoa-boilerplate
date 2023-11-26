import httpStatus from 'http-status';
import { ValidateError } from 'tsoa';
import { Exception } from '../exceptions/Exception';

export class ErrorResponsePayload {
  result: 'FAILED';
  data: {
    statusCode: number;
    message: string;
    details: any | null;
  };

  constructor(err: Error | Exception | ValidateError) {
    this.result = 'FAILED';

    // logical error
    if (err instanceof Exception) {
      const { statusCode, message } = err.getter();
      this.data = {
        statusCode,
        message,
        details: null,
      };
    }
    // tsoa validation error
    else if (err instanceof ValidateError) {
      this.data = {
        statusCode: err.status,
        message: err.message,
        details: err.fields,
      };
    }
    // physical error
    else {
      this.data = {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: httpStatus[500],
        details: null,
      };
    }
  }
}
