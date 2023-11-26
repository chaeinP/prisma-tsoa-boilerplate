import httpStatus from 'http-status';
import { Exception } from './exception';

export class ConflictException extends Exception {
  constructor(message?: string) {
    super();

    this.statusCode = httpStatus.CONFLICT;
    this.message = message || (httpStatus[this.statusCode] as string);
  }
}
