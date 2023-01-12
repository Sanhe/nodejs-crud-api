import { v4 as uuidv4 } from 'uuid';
import storage from './user.storage';
import IUser from './user.interface';
import assertFound from '../../assert/found.assert';
import { NOT_FOUND } from './user.message';

const findExistingIndex = async (id: string): Promise<number> => {
  const index = storage.findIndex((user) => user.id === id);

  assertFound<number | undefined>(index, NOT_FOUND);

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

const create = async (model: IUser): Promise<IUser> => {
  // TODO: change it after development.
  // const id = uuidv4();
  const id = '0388f28e-019a-4b3c-8cde-4a063f069440';

  const user = { ...model, id };
  storage.push(user);

  return user;
};

const update = async (id: string, model: IUser): Promise<IUser> => {
  const index = await findExistingIndex(id);

  storage[index] = { ...model };

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
