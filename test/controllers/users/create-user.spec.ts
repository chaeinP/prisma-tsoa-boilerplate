import request from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import app from '../../../src/app';
import { resetPostgres } from '../../helpers/reset-postgres';

describe('[POST] {teamId}/users', () => {
  afterEach(async () => {
    await resetPostgres();
  });

  const validEmail = faker.internet.email();
  const validNickname = faker.word.noun({ length: { min: 1, max: 10 } });
  const validPassword = faker.word.sample({ length: { min: 8, max: 12 } });

  describe('When request body is valid', () => {
    it('should return 201 status code', async () => {
      const validRequestBody = {
        email: validEmail,
        nickname: validNickname,
        password: validPassword,
      };
      const { statusCode, body } = await request(app).post('/1-1/users').send(validRequestBody);

      expect(statusCode).toBe(httpStatus.CREATED);
      expect(body.data).toEqual({
        id: expect.any(Number),
        email: validRequestBody.email,
        nickname: validRequestBody.nickname,
        profileImageUrl: null,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe('When request body is invalid', () => {
    describe('When request body is empty', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post('/1-1/users').send({});

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.data.message).toEqual('이메일을 입력해주세요.');
      });
    });

    describe('When request body is missing nickname fields', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post('/1-1/users').send({
          email: validEmail,
          nickname: '',
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.data.message).toEqual('닉네임을 입력해주세요.');
      });
    });

    describe('When email is invalid', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app).post('/1-1/users').send({
          email: faker.word.noun(),
          nickname: validNickname,
          password: validPassword,
        });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.data.message).toEqual('이메일 형식으로 작성해주세요.');
      });
    });

    describe('When nickname length is over 10', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app)
          .post('/1-1/users')
          .send({
            email: validEmail,
            nickname: faker.word.noun({ length: { min: 11, max: 20 } }),
            password: validPassword,
          });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.data.message).toEqual('닉네임은 10자 이하로 작성해주세요.');
      });
    });

    describe('When password length is under 8', () => {
      it('should return 400 status code', async () => {
        const { statusCode, body } = await request(app)
          .post('/1-1/users')
          .send({
            email: validEmail,
            nickname: validNickname,
            password: faker.word.sample({ length: { min: 1, max: 7 } }),
          });

        expect(statusCode).toBe(httpStatus.BAD_REQUEST);
        expect(body.data.message).toEqual('비밀번호는 8자 이상 입력해주세요.');
      });
    });
  });
});
