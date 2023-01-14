import { IUser } from './user.interface.js';

type StorageType = {
  data: IUser[];
  isSyncAvailable: boolean;
  getData: () => Promise<IUser[]>;
  setData: (data: IUser[]) => Promise<void>;
  push: (element: IUser) => Promise<void>;
  updateByIndex: (element: IUser, index: number) => Promise<void>;
  removeByIndex: (index: number) => Promise<IUser[]>;
  syncData: () => Promise<void>;
  clear: () => Promise<void>;
};

export default StorageType;
