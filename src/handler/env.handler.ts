import { config as dotenvConfig } from 'dotenv';

interface IEnvSource {
  API_PORT: number | undefined;
  IS_LOGGING_ENABLED: boolean | undefined;
  BASE_URL: string | undefined;
}

interface IEnv {
  API_PORT: number;
  IS_LOGGING_ENABLED: boolean;
  BASE_URL: string;
}

const getEnv = (): IEnv => {
  dotenvConfig();

  const envSource: IEnvSource = {
    API_PORT: process.env.API_PORT ? Number(process.env.API_PORT) : undefined,
    IS_LOGGING_ENABLED: process.env.IS_LOGGING_ENABLED
      ? process.env.IS_LOGGING_ENABLED === 'true'
      : undefined,
    BASE_URL: process.env.BASE_URL,
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
