import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server';
import userStorage from '../src/component/user/user.storage';
import TEST_PORT from './config/server.config';

const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('GET /api/some-non/existing/resource', () => {
  it('should return status 404', async () => {
    const response = await request.get(`/api/some-non/existing/resource`);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_NOT_FOUND);
  });
});
