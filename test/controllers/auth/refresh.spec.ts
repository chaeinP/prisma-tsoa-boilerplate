import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import { getPrismaClient } from '../../helpers/prisma-client';
import { createHashedPassword } from '../../../src/utils/create-hashed-password';
import { generateAccessToken } from '../../../src/utils/generate-access-token';

describe('[POST] {teamId}/auth/tokens', () => {
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

  describe('When token is valid', () => {
    it('should return 201 status code', async () => {
      const refreshToken = generateAccessToken({ id: userId!, teamId });

      const { statusCode, body } = await request(app)
        .post(`/${teamId}/auth/tokens`)
        .set('Authorization', `Bearer ${refreshToken}`);

      expect(statusCode).toBe(httpStatus.CREATED);
      expect(body).toEqual({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
