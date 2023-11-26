import crypto from 'crypto';
import { inject } from 'inversify';
import { Prisma } from '@prisma/client';
import { UserRepository } from './user.repository';
import { provideSingleton } from '../../ioc/provide-singleton';

@provideSingleton(UserService)
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) {}

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = this.createHashedPassword(data.password);
    const user = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, teamId: __, deletedAt: ___, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  private createHashedPassword(password: string) {
    return crypto.createHash('sha512').update(password).digest('base64');
  }
}
