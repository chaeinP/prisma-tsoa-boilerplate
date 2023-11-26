import { inject } from 'inversify';
import { UserService } from '../../domain/user/user.sevice';
import { provideSingleton } from '../../ioc/provide-singleton';
import { generateAccessToken } from '../../utils/generate-access-token';
import { generateRefreshToken } from '../../utils/generate-refresh-token';

@provideSingleton(AuthServiceFacade)
export class AuthServiceFacade {
  constructor(@inject(UserService) private readonly userService: UserService) {}

  async login({ teamId, email, password }: { teamId: string; email: string; password: string }) {
    const user = await this.userService.validate({ teamId, email, password });

    const accessToken = generateAccessToken({ id: user.id, teamId });

    const refreshToken = generateRefreshToken({ id: user.id, teamId });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refresh({ id, teamId }: { id: number; teamId: string }) {
    const user = await this.userService.getById({ id, teamId });

    const accessToken = generateAccessToken({ id: user.id, teamId });
    const refreshToken = generateRefreshToken({ id: user.id, teamId });

    return {
      accessToken,
      refreshToken,
    };
  }
}
