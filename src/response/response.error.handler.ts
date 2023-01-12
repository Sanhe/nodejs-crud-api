import { constants as httpStatus } from 'http2';
import IResponseData from './response.data.interface';
import HttpBadRequestError from '../error/http.bad.request.error';
import NotFoundError from '../error/not.found.error';

const getErrorResponseData = (error: Error | unknown): IResponseData | null => {
  let response: IResponseData | null = null;

  if (error instanceof HttpBadRequestError) {
    response = {
      status: httpStatus.HTTP_STATUS_BAD_REQUEST,
      data: { message: error.message },
    };
  } else if (error instanceof NotFoundError) {
    response = {
      status: httpStatus.HTTP_STATUS_NOT_FOUND,
      data: { message: error.message },
    };
  }

  return response;
};

export default getErrorResponseData;
