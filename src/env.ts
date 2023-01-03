import { config as dotenvConfig } from 'dotenv';

interface IEnvSource {
  PORT: number | undefined;
}

interface IEnv {
  PORT: number;
}

const getEnv = (): IEnv => {
  dotenvConfig();

  const envSource: IEnvSource = {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
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
