class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'HttpNotFoundError';
  }
}

export default NotFoundError;
