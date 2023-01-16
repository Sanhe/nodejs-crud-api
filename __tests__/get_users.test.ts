import { constants as httpStatus } from 'node:http2';
import supertest from 'supertest';
import { addServer } from '../src/server.js';
import userStorage from '../src/component/user/user.storage.js';
import { DEFAULT_USERS } from './config/users.config.js';

const TEST_PORT = 3001;
const request = supertest(addServer(TEST_PORT));

beforeEach(async () => {
  await userStorage.clear();
});

describe('GET /api/users', () => {
  it('should return status 200', async () => {
    const response = await request.get('/api/users');

    expect(response.status).toBe(httpStatus.HTTP_STATUS_OK);
  });

  it('should return empty body', async () => {
    const response = await request.get('/api/users');

    expect(response.body).toEqual([]);
  });

  it('should return all users', async () => {
    await userStorage.setData(DEFAULT_USERS);

    const response = await request.get('/api/users');

    expect(response.body).toEqual(DEFAULT_USERS);
  });
});
