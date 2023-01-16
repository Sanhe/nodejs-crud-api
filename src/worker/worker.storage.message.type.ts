import { IUser } from '../component/user/user.interface.js';

type WorkerStorageMessageType = {
  task: string;
  data: IUser[];
};

export default WorkerStorageMessageType;
