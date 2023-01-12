import NotFoundError from '../error/not.found.error';

function assertIndexFound(
  index: number,
  notFoundMessage: string
): asserts index is number {
  const isIndexNotFound = index === -1;

  if (isIndexNotFound) {
    throw new NotFoundError(notFoundMessage);
  }
}

export { assertIndexFound };
