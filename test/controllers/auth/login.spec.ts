import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import { getPrismaClient } from '../../helpers/prisma-client';
import { createHashedPassword } from '../../../src/utils/create-hashed-password';

describe('[POST] {teamId}/auth/login', () => {
  const prisma = getPrismaClient();
  const validEmail = faker.internet.email();
  const validName = faker.word.noun({ length: { min: 1, max: 10 } });
  const validPassword = faker.word.sample({ length: { min: 8, max: 12 } });
  const teamId = faker.word.noun();

  let userId: number | null = null;

  beforeEach(async () => {
    const user = await prisma.user.create({
      data: {
        email: validEmail,
        name: validName,
        password: createHashedPassword(validPassword),
        teamId,
      },
    });

    userId = user.id;
  });

  afterEach(async () => {
    if (userId) await prisma.user.delete({ where: { id: userId } });

    userId = null;
  });

  describe('When login info is valid', () => {
    it('should return 201 status code', async () => {
      const { statusCode, body } = await request(app).post(`/${teamId}/auth/login`).send({
        email: validEmail,
        password: validPassword,
      });

      expect(statusCode).toBe(httpStatus.CREATED);
      expect(body).toEqual({
        refreshToken: expect.any(String),
        accessToken: expect.any(String),
        user: {
          id: expect.any(Number),
          email: validEmail,
          name: validName,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      });
    });
  });

  describe('When login info is invalid', () => {
    describe('When email does not exist', () => {
      it('should return 404 status code', async () => {
        const { statusCode, body } = await request(app).post(`/${teamId}/auth/login`).send({
          email: faker.internet.email(),
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.NOT_FOUND);
        expect(body.message).toEqual('가입되지 않은 이메일입니다.');
      });
    });

    describe("When password doesn't match", () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app)
          .post(`/${teamId}/auth/login`)
          .send({
            email: validEmail,
            password: faker.word.sample({ length: { min: 8, max: 12 } }),
          });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.message).toEqual('비밀번호가 올바르지 않습니다.');
      });
    });
  });
});
