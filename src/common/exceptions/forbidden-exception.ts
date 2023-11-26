import httpStatus from 'http-status';
import { Exception } from './exception';

export class ForbiddenException extends Exception {
  constructor(message?: string) {
    super();

    this.statusCode = httpStatus.FORBIDDEN;
    this.message = message || (httpStatus[this.statusCode] as string);
  }
}
