import NotFoundError from '../error/not.found.error';

function assertFound<T>(model: T, notFoundMessage: string): asserts model is T {
  const isModelNotFound = !model || model === null || model === undefined;

  if (isModelNotFound) {
    throw new NotFoundError(notFoundMessage);
  }
}

export default assertFound;
