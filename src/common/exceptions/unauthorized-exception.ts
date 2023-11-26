import httpStatus from 'http-status';
import { Exception } from './exception';

export class UnAuthorizedException extends Exception {
  constructor(message?: string) {
    super();

    this.statusCode = httpStatus.UNAUTHORIZED;
    this.message = message || (httpStatus[this.statusCode] as string);
  }
}
