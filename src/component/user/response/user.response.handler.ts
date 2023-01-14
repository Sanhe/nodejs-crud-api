import { constants as httpStatus } from 'node:http2';
import { IUser } from '../user.interface.js';
import errorResponse from './user.error.response.js';
import IResponseData from '../../../response/response.data.interface.js';

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
  getOkResponse,
  getFindOneResponse,
  getCreatedResponse,
  getUpdatedResponse,
  getDeletedResponse,
};
