import cluster, { Worker } from 'node:cluster';
import process from 'node:process';
import { cpus } from 'node:os';
import { urlToHttpOptions } from 'node:url';
import {
  createServer,
  IncomingMessage,
  ServerResponse,
  request as httpRequest,
} from 'node:http';
import * as logger from './handler/log.handler';
import server from './server';
import userStorage from './component/user/user.storage';
import { IUser } from './component/user/user.interface';
import WorkerStorageMessageType from './worker/worker.storage.message.type';
import { constants as httpStatus } from 'http2';
import responseHeaders from './response/response.json.header';
import { INTERNAL_SERVER_ERROR } from './response/response.message';

const numCPUs = cpus().length;
let iteration = 0;
const workers: Worker[] = [];

userStorage.isSyncAvailable = true;

const getWorkerPortByRoundRobin = (startPort: number): number => {
  iteration = iteration === numCPUs ? 1 : iteration + 1;
  const port = startPort + iteration;

  return port;
};

const prepareRequestOptionsForWorker = (
  workerPort: number,
  balancerRequest: IncomingMessage
) => {
  const balancerRequestUrl = new URL(
    balancerRequest.url!,
    process.env.BASE_URL
  );
  const urlOptions = urlToHttpOptions(balancerRequestUrl);
  const requestOptionsForWorker = {
    ...urlOptions,
    port: workerPort,
    headers: balancerRequest.headers,
    method: balancerRequest.method,
  };

  return requestOptionsForWorker;
};

const syncStorage = (storageData: IUser[]) => {
  workers.forEach((worker) => {
    worker.send({
      task: 'sync',
      data: storageData,
    });
  });
};

const syncWorkersData = (workersToSync: Worker[]) => {
  workersToSync.forEach((worker) => {
    worker.on('message', async (message: WorkerStorageMessageType) => {
      if (message.task === 'sync') {
        syncStorage(message.data);
      }
    });
  });
};

const balancer = (mainPort: number) => {
  if (cluster.isPrimary) {
    logger.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i += 1) {
      const worker = cluster.fork();
      workers.push(worker);
    }

    cluster.on('exit', (worker) => {
      logger.log(`Worker ${worker.process.pid} died`);
    });

    syncWorkersData(workers);

    const appServer = createServer(
      async (
        balancerRequest: IncomingMessage,
        balancerResponse: ServerResponse
      ) => {
        logger.log(
          `${balancerRequest.method} request received on balancer on PORT ${mainPort}`
        );

        try {
          const currentPortForLoadBalanceRequest =
            getWorkerPortByRoundRobin(mainPort);
          const requestOptionsForWorker = prepareRequestOptionsForWorker(
            currentPortForLoadBalanceRequest,
            balancerRequest
          );
          logger.log(
            `Request from balancer to worker on PORT ${currentPortForLoadBalanceRequest}`
          );

          const workerPipe = httpRequest(
            requestOptionsForWorker,
            (response) => {
              balancerResponse.writeHead(
                response.statusCode!,
                response.headers
              );
              response.pipe(balancerResponse);
            }
          );

          balancerRequest.pipe(workerPipe);
        } catch (error) {
          balancerResponse.writeHead(
            httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            responseHeaders
          );
          balancerResponse.end(INTERNAL_SERVER_ERROR);
        }
      }
    );

    appServer.listen(mainPort, () => {
      logger.log(`Balancer is running on PORT ${mainPort}`);
    });
  } else {
    const workerPort = mainPort + cluster.worker!.id;

    process.on('message', async (message: WorkerStorageMessageType) => {
      if (message.task === 'sync') {
        await userStorage.setData(message.data);
      }
    });

    server(workerPort);

    logger.log(`Worker ${process.pid} started on PORT ${workerPort}`);
  }
};

export default balancer;
