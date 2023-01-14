import { IUser } from './user.interface';
import StorageType from './user.storage.type';
import { syncStorage } from '../../handler/storage.handler';

const storage: StorageType = {
  data: [],
  isSyncAvailable: false,

  getData: async (): Promise<IUser[]> => {
    return storage.data;
  },

  setData: async (data: IUser[]): Promise<void> => {
    storage.data = data;
  },

  push: async (element: IUser): Promise<void> => {
    storage.data.push(element);
    await storage.syncData();
  },

  updateByIndex: async (element: IUser, index: number) => {
    storage.data[index] = element;
    await storage.syncData();
  },

  removeByIndex: async (index: number): Promise<IUser[]> => {
    const removed = storage.data.splice(index, 1);

    await storage.syncData();

    return removed;
  },

  syncData: async (): Promise<void> => {
    if (storage.isSyncAvailable) {
      await syncStorage<StorageType>(storage);
    }
  },
};

export default storage;
