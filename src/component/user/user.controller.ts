import * as repository from './user.repository';
import IUser from './user.interface';
import assertUuid from '../../assert/uuid.assert';
import IResponseData from '../../response/response.data.interface';
import * as responseHandler from './response/user.response.handler';

const get = async (): Promise<IResponseData> => {
  const entities = await repository.findAll();

  return responseHandler.getOkResponse(entities);
};

const getOne = async ({ id }: IUser): Promise<IResponseData> => {
  assertUuid(id);

  const entity = await repository.findById(id);
  const response = responseHandler.getFindOneResponse(entity);

  return response;
};

const create = async (model: IUser): Promise<IResponseData> => {
  const entity = await repository.create(model);
  const response = responseHandler.getCreatedResponse(entity);

  return response;
};

const update = async (model: IUser): Promise<IResponseData> => {
  const { id } = model;

  assertUuid(id);

  const entity = await repository.update(id, model);
  const response = responseHandler.getUpdatedResponse(entity);

  return response;
};

const remove = async ({ id }: IUser): Promise<IResponseData> => {
  assertUuid(id);

  const isRemoved = await repository.remove(id);
  const response = responseHandler.getDeletedResponse(isRemoved);

  return response;
};

export { get, getOne, create, update, remove };
