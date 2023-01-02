import { config } from 'dotenv';

interface IEnv {
  port: string;
}

const getPort = (): string => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error('Port is not defined');
  }

  return PORT;
};

const getEnv = (): IEnv => {
  config();

  return {
    port: getPort(),
  };
};

export default getEnv;
