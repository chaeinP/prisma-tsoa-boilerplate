import httpStatus from 'http-status';
import { Exception } from './exception';

export class BadRequestException extends Exception {
  constructor(message?: string) {
    super();

    this.statusCode = httpStatus.BAD_REQUEST;
    this.message = message || (httpStatus[this.statusCode] as string);
  }
}
