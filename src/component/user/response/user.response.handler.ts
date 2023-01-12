import { constants as httpStatus } from 'http2';
import { IUser } from '../user.interface';
import errorResponse from './user.error.response';
import IResponseData from '../../../response/response.data.interface';
import NotFoundError from '../../../error/not.found.error';

const getErrorResponse = (error: any): IResponseData => {
  let response = {} as IResponseData;

  // TODO: improve error handling
  if (error instanceof NotFoundError) {
    response = errorResponse.NOT_FOUND;
  } else {
    response = errorResponse.INTERNAL_SERVER_ERROR;
  }

  return response;
};

const getOkResponse = (userData: IUser[] | IUser): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_OK,
    data: userData,
  };
};

const getFindOneResponse = (userData: IUser | undefined): IResponseData => {
  if (!userData) {
    return errorResponse.NOT_FOUND;
  }

  return {
    status: httpStatus.HTTP_STATUS_OK,
    data: userData,
  };
};

const getCreatedResponse = (userData: IUser): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_CREATED,
    data: userData,
  };
};

const getUpdatedResponse = (userData: IUser): IResponseData => {
  return {
    status: httpStatus.HTTP_STATUS_OK,
    data: userData,
  };
};

const getDeletedResponse = (isRemoved: boolean): IResponseData => {
  if (!isRemoved) {
    return errorResponse.INTERNAL_SERVER_ERROR;
  }

  return {
    status: httpStatus.HTTP_STATUS_NO_CONTENT,
    data: {},
  };
};

export {
  getErrorResponse,
  getOkResponse,
  getFindOneResponse,
  getCreatedResponse,
  getUpdatedResponse,
  getDeletedResponse,
};
