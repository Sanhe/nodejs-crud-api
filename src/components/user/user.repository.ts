import UserStorage from './user.storage';
import IUser from './user.interface';

const findAll = async (): Promise<IUser[]> => {
  return UserStorage;
};

const findById = async (id: string): Promise<IUser | undefined> => {
  return UserStorage.find((user) => user.id === id);
};

const create = async (user: IUser): Promise<IUser> => {
  UserStorage.push(user);
  return user;
};

const update = async (id: string, user: IUser): Promise<IUser> => {
  const index = UserStorage.findIndex((existingUser) => existingUser.id === id);
  UserStorage[index] = user;
  return UserStorage[index];
};

const removeUser = async (id: string): Promise<void> => {
  const index = UserStorage.findIndex((user) => user.id === id);
  UserStorage.splice(index, 1);
};

const userRepository = {
  findAll,
  findById,
  create,
  update,
  removeUser,
};

export default userRepository;
