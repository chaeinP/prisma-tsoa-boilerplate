/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { Body, Controller, Middlewares, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { UserCreateRequstDto } from './dto/user-create.request.dto';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { UserService } from '../../domain/user/user.sevice';
import { provideSingleton } from '../../ioc/provide-singleton';
import { ErrorResponsePayload } from '../../common/responses/error-response-payload';

@Tags('/user')
@Route('/{teamId}/user')
@provideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  /**
   * @summary 회원가입
   */
  @Post('/')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponsePayload>('400', 'BadRequest', [
    {
      message: '이메일 형식으로 작성해 주세요.',
    },
    {
      message: '이메일을 입력해 주세요.',
    },
    {
      message: '이름을 입력해 주세요.',
    },
    {
      message: '비밀번호가 8자 이상이 되도록 해 주세요.',
    },
  ])
  @Response<ErrorResponsePayload>('409', 'ConflictException', [
    {
      message: '이미 사용 중인 이메일입니다.',
    },
  ])
  @Middlewares(validateRequestBody(UserCreateRequstDto))
  async create(@Path('teamId') teamId: string, @Body() body: UserCreateRequstDto) {
    const user = await this.userService.create({ teamId, ...body });

    return user;
  }
}
