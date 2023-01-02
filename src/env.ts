import dotenv from 'dotenv';

interface IEnv {
  PORT: string;
}

const getPort = (): string => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error('PORT is not defined');
  }

  return PORT;
};

const getEnv = (): IEnv => {
  dotenv.config();

  return {
    PORT: getPort(),
  };
};

export default getEnv;
