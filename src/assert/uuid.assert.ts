import { validate as validateUuid } from 'uuid';
import HttpBadRequestError from '../error/http.bad.request.error';
import { INVALID_UUID } from '../response/response.message';

function assertUuid(value: any): asserts value is string {
  const isInvalidUuid = typeof value !== 'string' || !validateUuid(value);

  if (isInvalidUuid) {
    throw new HttpBadRequestError(INVALID_UUID);
  }
}

export default assertUuid;
