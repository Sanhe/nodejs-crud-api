import { constants as httpStatus } from 'node:http2';
import IResponseData from '../../../response/response.data.interface.js';
import { INTERNAL_SERVER_ERROR } from '../../../response/response.message.js';
import { NOT_FOUND } from '../user.message.js';

const errorResponse: { [index: string]: IResponseData } = {
  NOT_FOUND: {
    status: httpStatus.HTTP_STATUS_NOT_FOUND,
    data: { message: NOT_FOUND },
  },
  INTERNAL_SERVER_ERROR: {
    status: httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    data: { message: INTERNAL_SERVER_ERROR },
  },
};

export default errorResponse;
