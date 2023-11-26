import httpStatus from 'http-status';
import { ValidateError } from 'tsoa';
import { Exception } from '../exceptions/exception';

export class ErrorResponsePayload {
  message: string;

  constructor(err: Error | Exception | ValidateError) {
    // logical error
    if (err instanceof Exception) {
      const { message } = err.getter();
      this.message = message;
    }
    // tsoa validation error
    else if (err instanceof ValidateError) {
      this.message = '입력값이 유효하지 않습니다.';
    }

    // physical error
    else {
      this.message = httpStatus[500];
    }
  }
}
