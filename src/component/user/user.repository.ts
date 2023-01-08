import storage from './user.storage';
import IUser from './user.interface';

const findAll = async (): Promise<IUser[]> => {
  return storage;
};

const findById = async (id: string): Promise<IUser | undefined> => {
  return storage.find((user) => user.id === id);
};

const create = async (user: IUser): Promise<IUser> => {
  storage.push(user);
  return user;
};

const update = async (id: string, user: IUser): Promise<IUser> => {
  const index = storage.findIndex((existingUser) => existingUser.id === id);
  storage[index] = user;
  return storage[index];
};

const remove = async (id: string): Promise<void> => {
  const index = storage.findIndex((user) => user.id === id);
  storage.splice(index, 1);
};

export { findAll, findById, create, update, remove };
