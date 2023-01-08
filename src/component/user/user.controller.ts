import * as repository from './user.repository';
import IUser from './user.interface';

const get = async (): Promise<IUser[]> => {
  const users = await repository.findAll();

  return users;
};

const getOne = async (id: string) => {
  const user = await repository.findById(id);

  return user;
};

const create = async () => {
  const userData: IUser = {
    id: 'test-id',
    name: 'Alex',
    age: 27,
    hobbies: ['books', 'gym'],
  };
  const user = await repository.create(userData);

  return user;
};

const update = async () => {
  const userData: IUser = {
    id: 'test-id',
    name: 'Alex',
    age: 35,
    hobbies: ['books', 'box'],
  };
  const user = await repository.update(userData.id, userData);

  return user;
};

const remove = async () => {
  const userId = 'test-id';
  await repository.remove(userId);
};

export { get, getOne, create, update, remove };
