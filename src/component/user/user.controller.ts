import * as repository from './user.repository';
import { IUser } from './user.interface';
import assertUuid from '../../assert/uuid.assert';
import IResponseData from '../../response/response.data.interface';
import * as responseHandler from './response/user.response.handler';
import { validateModel } from '../../validation/validator';
import { createUserRules, updateUserRules } from './user.validation.rules';

const get = async (): Promise<IResponseData> => {
  const users = await repository.findAll();

  return responseHandler.getOkResponse(users);
};

const getOne = async ({ id }: IUser): Promise<IResponseData> => {
  assertUuid(id);

  const user = await repository.findById(id);
  const response = responseHandler.getFindOneResponse(user);

  return response;
};

const create = async (model: IUser): Promise<IResponseData> => {
  validateModel<IUser>(model, createUserRules);

  const user = await repository.create(model);
  const response = responseHandler.getCreatedResponse(user);

  return response;
};

const update = async (model: IUser): Promise<IResponseData> => {
  const { id } = model;

  assertUuid(id);
  validateModel<IUser>(model, updateUserRules);

  const user = await repository.update(id, model);
  const response = responseHandler.getUpdatedResponse(user);

  return response;
};

const remove = async ({ id }: IUser): Promise<IResponseData> => {
  assertUuid(id);

  const isRemoved = await repository.remove(id);
  const response = responseHandler.getDeletedResponse(isRemoved);

  return response;
};

export { get, getOne, create, update, remove };
