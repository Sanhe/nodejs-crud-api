import server from './src/server.js';
import envs from './src/handler/env.handler';

server(envs.API_PORT);
