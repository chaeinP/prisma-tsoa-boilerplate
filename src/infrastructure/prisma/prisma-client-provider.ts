import { PrismaClient } from '@prisma/client';
import { provideSingleton } from '../../ioc/provide-singleton';

@provideSingleton(PrismaClientProvider)
export class PrismaClientProvider extends PrismaClient {
  constructor() {
    super();

    this.$use(async (params, next) => {
      const kstDate = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);

      if (params.action === 'create') {
        params.args.data.createdAt = kstDate;
        params.args.data.updatedAt = kstDate;
      }

      if (params.action === 'update' || params.action === 'updateMany') {
        params.args.data.updatedAt = kstDate;
        if (params.args.data.deletedAt) {
          params.args.data.deletedAt = kstDate;
        }
      }

      const result = await next(params);

      return result;
    });
  }
}
