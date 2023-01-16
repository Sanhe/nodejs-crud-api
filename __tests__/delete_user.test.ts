import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server.js';
import userStorage from '../src/component/user/user.storage.js';
import TEST_PORT from './config/server.config.js';
import { DEFAULT_FIRST_USER_ID, DEFAULT_USERS } from './config/users.config.js';
import { NOT_FOUND } from '../src/component/user/user.message.js';

const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('DELETE /api/users/:id', () => {
  it('should return status 204 on success', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request.delete(
      `/api/users/${DEFAULT_FIRST_USER_ID}`
    );

    expect(response.status).toBe(httpStatus.HTTP_STATUS_NO_CONTENT);
  });

  it('should return status 404 on invalid id', async () => {
    const response = await request.delete(`/api/users/1`);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_BAD_REQUEST);
  });

  it('should return error message on 404', async () => {
    const response = await request.delete(
      `/api/users/${DEFAULT_FIRST_USER_ID}`
    );

    expect(response.body.message).toContain(NOT_FOUND);
  });
});
