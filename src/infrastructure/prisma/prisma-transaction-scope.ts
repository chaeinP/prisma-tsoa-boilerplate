import { inject } from 'inversify';
import { provideSingleton } from '../../ioc/provide-singleton';
import { PrismaClientProvider } from './prisma-client-provider';
import { Prisma } from '@prisma/client';

@provideSingleton(PrismaTransactionScope)
export class PrismaTransactionScope {
  constructor(@inject(PrismaClientProvider) private readonly prisma: PrismaClientProvider) {}

  async run<T>(fn: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return await this.prisma.$transaction(async (prisma: Prisma.TransactionClient): Promise<T> => {
      return await fn(prisma);
    });
  }
}
