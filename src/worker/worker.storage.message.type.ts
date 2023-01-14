import { IUser } from '../component/user/user.interface';

type WorkerStorageMessageType = {
  task: string;
  data: IUser[];
};

export default WorkerStorageMessageType;
