import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server';
import userStorage from '../src/component/user/user.storage';
import TEST_PORT from './config/server.config';
import {
  DEFAULT_FIRST_USER_ID,
  DEFAULT_USERS,
  USER_WITHOUT_ID,
} from './config/users.config';
import { INVALID_UUID } from '../src/response/response.message';
import { NOT_FOUND } from '../src/component/user/user.message';

const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('PUT /api/users/:id', () => {
  it('should return status 200 on success', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request
      .put(`/api/users/${DEFAULT_FIRST_USER_ID}`)
      .send(USER_WITHOUT_ID);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_OK);
  });

  it('should return updated user', async () => {
    await userStorage.setData(DEFAULT_USERS);
    const response = await request
      .put(`/api/users/${DEFAULT_FIRST_USER_ID}`)
      .send(USER_WITHOUT_ID);

    expect(response.body).toEqual({
      ...USER_WITHOUT_ID,
      id: DEFAULT_FIRST_USER_ID,
    });
  });

  it('should return status 400', async () => {
    const response = await request
      .put('/api/users/invalid_id')
      .send(USER_WITHOUT_ID);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_BAD_REQUEST);
  });

  it('should return error message on 400', async () => {
    const response = await request
      .put('/api/users/invalid_id')
      .send(USER_WITHOUT_ID);

    expect(response.body).toEqual({ message: INVALID_UUID });
  });

  it('should return status 404', async () => {
    const response = await request
      .put(`/api/users/${DEFAULT_FIRST_USER_ID}`)
      .send(USER_WITHOUT_ID);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_NOT_FOUND);
  });

  it('should return error message on 404', async () => {
    const response = await request
      .put(`/api/users/${DEFAULT_FIRST_USER_ID}`)
      .send(USER_WITHOUT_ID);

    expect(response.body).toEqual({ message: NOT_FOUND });
  });
});
