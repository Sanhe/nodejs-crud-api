import process from 'node:process';
import StorageType from '../component/user/user.storage.type.js';

const syncStorage = async <T extends StorageType>(storage: T) => {
  const data = await storage.getData();

  process.send!({ task: 'sync', data });
};

export { syncStorage };
