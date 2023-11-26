import { PrismaClient } from '@prisma/client';
import { provideSingleton } from '../../ioc/provide-singleton';

@provideSingleton(PrismaClientProvider)
export class PrismaClientProvider extends PrismaClient {
  constructor() {
    super();
  }
}
