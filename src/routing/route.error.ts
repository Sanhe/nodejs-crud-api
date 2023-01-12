class RouteNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RouteNotFoundError';
  }
}

export default RouteNotFoundError;
