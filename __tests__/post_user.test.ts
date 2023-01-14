import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server';
import userStorage from '../src/component/user/user.storage';
import TEST_PORT from './config/server.config';
import { USER_WITHOUT_ID } from './config/users.config';

const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('POST /api/users/:id', () => {
  it('should return status 201 on success', async () => {
    const response = await request.post(`/api/users`).send(USER_WITHOUT_ID);

    expect(response.status).toBe(httpStatus.HTTP_STATUS_CREATED);
  });

  it('should return user', async () => {
    const response = await request.post(`/api/users`).send(USER_WITHOUT_ID);
    const user = response.body;
    delete user.id;

    expect(user).toEqual(USER_WITHOUT_ID);
  });

  it('should return status 400 on invalid body', async () => {
    const response = await request.post(`/api/users`).send({});

    expect(response.status).toBe(httpStatus.HTTP_STATUS_BAD_REQUEST);
  });

  it('should return error message on 400', async () => {
    const response = await request.post(`/api/users`).send({});

    expect(response.body.message).toContain(
      'Required fields are missing or incorrect.'
    );
  });
});
