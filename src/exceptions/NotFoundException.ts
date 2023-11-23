import httpStatus from 'http-status';
import { Exception } from './Exception';

export class NotFoundException extends Exception {
  constructor(message?: string) {
    super();

    this.statusCode = httpStatus.NOT_FOUND;
    this.message = message || (httpStatus[this.statusCode] as string);
  }
}
