import envs from './src/handler/env.handler';
import balancer from './src/balancer';

balancer(envs.API_PORT);
