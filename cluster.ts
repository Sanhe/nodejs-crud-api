import envs from './src/handler/env.handler.js';
import balancer from './src/balancer.js';

balancer(envs.API_PORT);
