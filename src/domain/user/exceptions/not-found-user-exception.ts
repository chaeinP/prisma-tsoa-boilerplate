import { NotFoundException } from '../../../common/exceptions/not-found-exception';

export class NotFoundUserException extends NotFoundException {
  constructor() {
    super('가입되지 않은 이메일입니다.');
  }
}
