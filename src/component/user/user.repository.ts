import { v4 as uuidv4 } from 'uuid';
import storage from './user.storage';
import { IUser } from './user.interface';
import { assertIndexFound } from '../../assert/found.assert';
import { NOT_FOUND } from './user.message';

const findExistingIndex = async (id: string): Promise<number> => {
  const index = storage.findIndex((user) => user.id === id);

  assertIndexFound(index, NOT_FOUND);

  return index;
};

const findAll = async (): Promise<IUser[]> => {
  const users = storage;

  return users;
};

const findById = async (id: string): Promise<IUser | undefined> => {
  const user = storage.find((u) => u.id === id);

  return user;
};

const create = async (user: IUser): Promise<IUser> => {
  // TODO: change it after development.
  const id = uuidv4();
  // const id = '0388f28e-019a-4b3c-8cde-4a063f069440';

  const createdUser = { ...user, id };
  storage.push(createdUser);

  return createdUser;
};

const update = async (id: string, user: IUser): Promise<IUser> => {
  const index = await findExistingIndex(id);

  storage[index] = { ...user };

  return storage[index];
};

const remove = async (id: string): Promise<boolean> => {
  const index = await findExistingIndex(id);
  const removed = storage.splice(index, 1);
  const isRemoved = removed.length > 0;

  console.log(removed);

  return isRemoved;
};

export { findAll, findById, create, update, remove };
