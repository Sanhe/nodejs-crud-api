import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server';
import userStorage from '../src/component/user/user.storage';
import TEST_PORT from './config/server.config';
import { DEFAULT_FIRST_USER_ID, DEFAULT_USERS } from './config/users.config';
import { NOT_FOUND } from '../src/component/user/user.message';
import { INVALID_UUID } from '../src/response/response.message';

const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('GET /api/users/:id', () => {
  it('should return status 200', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request.get(`/api/users/${DEFAULT_FIRST_USER_ID}`);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_OK);
  });

  it('should return user', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request.get(`/api/users/${DEFAULT_FIRST_USER_ID}`);

    expect(response.body).toEqual(DEFAULT_USERS[0]);
  });

  it('should return status 400', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request.get('/api/users/invalid_id');

    expect(response.status).toBe(httpStatus.HTTP_STATUS_BAD_REQUEST);
  });

  it('should return error message on 400', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request.get('/api/users/invalid_id');

    expect(response.body).toEqual({ message: INVALID_UUID });
  });

  it('should return status 404', async () => {
    const response = await request.get(`/api/users/${DEFAULT_FIRST_USER_ID}`);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_NOT_FOUND);
  });

  it('should return error message on 404', async () => {
    const response = await request.get(`/api/users/${DEFAULT_FIRST_USER_ID}`);

    expect(response.body).toEqual({ message: NOT_FOUND });
  });
});
