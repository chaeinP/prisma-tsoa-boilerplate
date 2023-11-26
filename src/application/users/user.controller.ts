/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from 'inversify';
import { Body, Controller, Middlewares, Path, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { ResponsePayload } from '../../common/responses/response-payload';
import { UserCreateRequstDto } from './dto/user-create.request.dto';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { UserService } from '../../domain/users/user.sevice';
import { provideSingleton } from '../../ioc/provide-singleton';
import { ErrorResponsePayload } from '../../common/responses/error-response-payload';

@Tags('/users')
@Route('/{teamId}/users')
@provideSingleton(UserController)
export class UserController extends Controller {
  constructor(@inject(UserService) private readonly userService: UserService) {
    super();
  }

  @Post('/')
  @SuccessResponse(201, 'Created')
  @Response<ErrorResponsePayload>('400', 'BadRequest', [
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '이메일 형식으로 작성해주세요.',
        details: null,
      },
    },
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '이메일을 입력해주세요.',
        details: null,
      },
    },
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '닉네임은 10자 이하로 작성해주세요.',
        details: null,
      },
    },
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '닉네임을 입력해주세요.',
        details: null,
      },
    },
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '비밀번호는 8자 이상 입력해주세요.',
        details: null,
      },
    },
    {
      result: 'FAILED',
      data: {
        statusCode: 400,
        message: '비밀번호를 입력해주세요.',
        details: null,
      },
    },
  ])
  @Middlewares(validateRequestBody(UserCreateRequstDto))
  async create(@Path('teamId') teamId: string, @Body() body: UserCreateRequstDto) {
    const user = await this.userService.create({ teamId, ...body });

    return new ResponsePayload(user);
  }
}
