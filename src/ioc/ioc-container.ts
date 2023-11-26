import { PrismaClient } from '@prisma/client';
import { Container, decorate, injectable } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import { Controller } from 'tsoa';

const iocContainer = new Container({ skipBaseClassChecks: true });

decorate(injectable(), Controller);
decorate(injectable(), PrismaClient);

iocContainer.load(buildProviderModule());

export { iocContainer };
