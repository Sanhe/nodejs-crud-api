import server, { IServerConfig } from './src/server.js';
import getEnv from './src/env.js';

const env = getEnv();
const serverConfig: IServerConfig = {
  port: env.port,
};

server(serverConfig);
