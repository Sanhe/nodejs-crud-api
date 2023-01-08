import { config as dotenvConfig } from 'dotenv';

interface IEnvSource {
  API_PORT: number | undefined;
}

interface IEnv {
  API_PORT: number;
}

const getEnv = (): IEnv => {
  dotenvConfig();

  const envSource: IEnvSource = {
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
  };

  Object.entries(envSource).forEach(([key, value]) => {
    if (value === undefined) {
      throw new Error(`Missing key "${key}" in .env!`);
    }
  });

  return envSource as IEnv;
};

const envs = getEnv();

export default envs;
