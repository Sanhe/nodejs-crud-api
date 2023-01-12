import { IncomingMessage } from 'node:http';
import ResolvedRouteType from '../routing/resolved.route.type';
import resolveRoute from '../routing/router';
import IResponseData from '../response/response.data.interface';
import getErrorResponseData from '../response/response.error.handler';

const resolveBody = async (request: IncomingMessage): Promise<any> => {
  const buffers = [];

  /* eslint-disable no-restricted-syntax */
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  const rawBody = Buffer.concat(buffers);

  if (rawBody.length === 0) {
    return {};
  }

  const body = JSON.parse(rawBody.toString());

  return body;
};

const handle = async (request: IncomingMessage): Promise<IResponseData> => {
  try {
    const resolvedRoute: ResolvedRouteType = await resolveRoute(request);
    const action = resolvedRoute.route.handler;
    const body = await resolveBody(request);
    const model = {
      ...body,
      ...resolvedRoute.params,
    };

    console.log('Model: ', model);

    const responseData: IResponseData = await action(model);

    console.log('Response model data: ', responseData);

    return responseData;
  } catch (error) {
    const errorResponse = getErrorResponseData(error);

    if (!errorResponse) {
      throw error;
    }

    return errorResponse;
  }
};

export default handle;
