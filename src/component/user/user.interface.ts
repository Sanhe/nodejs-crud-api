import IModel from '../model.interface.js';

interface IUser extends IModel {
  id?: string;
  username: string;
  age: number;
  hobbies: string[];
}

export { IUser };
