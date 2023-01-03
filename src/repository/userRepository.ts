import UserStorage from '../storage/UserStorage';
import IUser from '../interface/userInterface';

const findAll = () => {
  return UserStorage;
};

const findById = (id: string) => {
  return UserStorage.find((user) => user.id === id);
};

const create = (user: IUser) => {
  UserStorage.push(user);
};

const update = (id: string, user: IUser) => {
  const index = UserStorage.findIndex((existingUser) => existingUser.id === id);
  UserStorage[index] = user;
};

const removeUser = (id: string) => {
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
