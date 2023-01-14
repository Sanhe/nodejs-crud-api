import { constants as httpStatus } from 'node:http2';
import IResponseData from './response.data.interface';
import BadRequestError from '../error/bad.request.error';
import NotFoundError from '../error/not.found.error';
import RouteNotFoundError from '../routing/route.error';

const isBadRequestError = (error: Error | unknown): boolean =>
  error instanceof BadRequestError;

const isNotFoundError = (error: Error | unknown): boolean => {
  return error instanceof NotFoundError || error instanceof RouteNotFoundError;
};

const getBadRequestResponse = (message: string): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_BAD_REQUEST,
    data: { message },
  };
};

const getNotFoundResponse = (message: string): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_NOT_FOUND,
    data: { message },
  };
};

const getInternalErrorResponse = (): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
    data: { message: 'Internal server error' },
  };
};

const getErrorResponseData = (error: Error | unknown): IResponseData | null => {
  let response: IResponseData | null = null;

  if (!error || !(error instanceof Error)) {
    return response;
  }

  if (isBadRequestError(error)) {
    response = getBadRequestResponse(error.message);
  } else if (isNotFoundError(error)) {
    response = getNotFoundResponse(error.message);
  } else {
    response = getInternalErrorResponse();
  }

  return response;
};

export default getErrorResponseData;
