const log = (message: any): void => {
  if (process.env.IS_LOGGING_ENABLED) {
    console.info(message);
  }
};

export { log };
