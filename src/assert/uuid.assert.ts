import { validate as validateUuid } from 'uuid';
import BadRequestError from '../error/bad.request.error.js';
import { INVALID_UUID } from '../response/response.message.js';

function assertUuid(value: unknown): asserts value is string {
  const isInvalidUuid = typeof value !== 'string' || !validateUuid(value);

  if (isInvalidUuid) {
    throw new BadRequestError(INVALID_UUID);
  }
}

export default assertUuid;
