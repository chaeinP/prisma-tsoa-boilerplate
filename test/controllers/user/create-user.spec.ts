import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import { getPrismaClient } from '../../helpers/prisma-client';

describe('[POST] {teamId}/user', () => {
  const prisma = getPrismaClient();
  const validEmail = faker.internet.email();
  const validName = faker.word.noun();
  const validPassword = faker.word.sample({ length: { min: 8, max: 12 } });
  const teamId = faker.word.noun();

  let userId: number | null = null;

  afterEach(async () => {
    if (userId) await prisma.user.delete({ where: { id: userId } });

    userId = null;
  });

  describe('When request body is valid', () => {
    it('should return 201 status code', async () => {
      const validRequestBody = {
        email: validEmail,
        name: validName,
        password: validPassword,
      };
      const { statusCode, body } = await request(app).post(`/${teamId}/user`).send(validRequestBody);
      userId = body.id;

      expect(statusCode).toBe(httpStatus.CREATED);
      expect(body).toEqual({
        id: expect.any(Number),
        email: validRequestBody.email,
        name: validRequestBody.name,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('When request body is invalid', () => {
    describe('When request body is empty', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post(`/${teamId}/user`).send({});

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.message).toEqual('이메일을 입력해 주세요.');
      });
    });

    describe('When request body is missing name fields', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post(`/${teamId}/user`).send({
          email: validEmail,
          name: '',
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.message).toEqual('이름을 입력해 주세요.');
      });
    });

    describe('When email is invalid', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post(`/${teamId}/user`).send({
          email: faker.word.noun(),
          name: validName,
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.message).toEqual('이메일 형식으로 작성해 주세요.');
      });
    });

    describe('When password length is under 8', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app)
          .post(`/${teamId}/user`)
          .send({
            email: validEmail,
            name: validName,
            password: faker.word.sample({ length: { min: 1, max: 7 } }),
          });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.message).toEqual('비밀번호가 8자 이상이 되도록 해 주세요.');
      });
    });

    describe('When email is already exists', () => {
      beforeEach(async () => {
        const user = await prisma.user.create({
          data: {
            email: validEmail,
            name: validName,
            password: validPassword,
            teamId,
          },
        });

        userId = user.id;
      });

      it('should return 409 status code', async () => {
        const { statusCode, body } = await request(app).post(`/${teamId}/user`).send({
          email: validEmail,
          name: validName,
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.CONFLICT);
        expect(body.message).toEqual('이미 사용 중인 이메일입니다.');
      });
    });
  });
});
