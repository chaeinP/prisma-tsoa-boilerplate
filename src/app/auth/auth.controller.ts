import { inject } from 'inversify';
import {
  Body,
  Controller,
  Middlewares,
  Path,
  Post,
  Request,
  Response,
  Route,
  Security,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { provideSingleton } from '../../ioc/provide-singleton';
import { validateRequestBody } from '../../middlewares/validate-request-body';
import { ErrorResponsePayload } from '../../common/responses/error-response-payload';
import { LoginBodyDto } from './dto/login-body.dto';
import { AuthServiceFacade } from './auth.service.facade';
import { UserServiceResponseDto } from '../../domain/user/dto/user-service-response.dto';

@Tags('Auth')
@Route('/{teamId}/auth')
@provideSingleton(AuthController)
export class AuthController extends Controller {
  constructor(@inject(AuthServiceFacade) private readonly authServiceFacade: AuthServiceFacade) {
    super();
  }

  /**
   * @summary 로그인
   */
  @Post('/login')
  @SuccessResponse(201, 'Created')
  @Middlewares(validateRequestBody(LoginBodyDto))
  @Response<ErrorResponsePayload>('400', 'BadRequest', [
    {
      message: '이메일 형식으로 작성해 주세요.',
    },
    {
      message: '이메일을 입력해 주세요.',
    },
    {
      message: '비밀번호를 입력해 주세요.',
    },
    {
      message: '비밀번호가 올바르지 않습니다.',
    },
  ])
  @Response<ErrorResponsePayload>('404', 'NotFoundException', [
    {
      message: '가입되지 않은 이메일입니다.',
    },
  ])
  async login(
    @Path('teamId') teamId: string,
    @Body() body: LoginBodyDto,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserServiceResponseDto;
  }> {
    const response = await this.authServiceFacade.login({ teamId, ...body });

    return response;
  }

  /**
   * @summary 토큰 재발급
   */
  @Post('/tokens')
  @SuccessResponse(201, 'Created')
  @Security('bearerAuth')
  async refresh(
    @Path('teamId') teamId: string,
    @Request() request: Express.Request,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = request.user;
    const response = await this.authServiceFacade.refresh(user!);

    return response;
  }
}
