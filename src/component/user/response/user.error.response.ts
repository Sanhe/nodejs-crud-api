import { constants as httpStatus } from 'http2';
import IResponseData from '../../../response/response.data.interface';
import { INTERNAL_SERVER_ERROR } from '../../../response/response.message';
import { NOT_FOUND } from '../user.message';

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
