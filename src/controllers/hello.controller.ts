import { ResponsePayload } from '../common/response-payload';
import { Controller, Get, Route, SuccessResponse, Tags } from 'tsoa';
import { prisma } from '../../prisma/prisma-client';

@Route('/hello')
@Tags('/')
export class HelloController extends Controller {
  @Get('/')
  @SuccessResponse(200, 'OK')
  async getHello() {
    const hello = await prisma.test.findFirst();
    if (hello) return new ResponsePayload(hello.title);
    else return new ResponsePayload('no data');
  }
}
