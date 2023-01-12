import { IncomingMessage } from 'node:http';
import routes from './routes';
import HttpMethodType from '../http.method.type';
import RouteType from './route.type';
import ResolvedRouteType from './resolved.route.type';
import RouteParamsType from './route.params.type';

const getRawParams = (url: string, route: RouteType): string[] => {
  const paramsString = url.replace(route.path, '');
  const isParamsStringEmpty = paramsString === '';

  if (isParamsStringEmpty) {
    return [];
  }

  const rawParams = paramsString.split('/');

  return rawParams;
};

const parseParams = (url: string, route: RouteType): RouteParamsType => {
  const rawParams = getRawParams(url, route);

  const params: RouteParamsType = {};

  route.params.forEach((paramName, index) => {
    params[paramName] = rawParams[index];
  });

  return params;
};

const findRoute = (
  httpMethod: HttpMethodType,
  url: string
): RouteType | undefined => {
  const route = routes.find((r: RouteType) => {
    const isMethodDifferent = r.method !== httpMethod;

    if (isMethodDifferent) {
      return false;
    }

    const isUrlIncludesRoutePath = url.includes(r.path);

    if (!isUrlIncludesRoutePath) {
      return false;
    }

    const rawParams = getRawParams(url, r);
    const rawParamsLength = rawParams.length;
    const isParamsLengthDifferent = rawParamsLength !== r.params.length;

    if (isParamsLengthDifferent) {
      return false;
    }

    return true;
  });

  return route;
};

const resolve = async (
  request: IncomingMessage
): Promise<ResolvedRouteType> => {
  const url: string = request.url?.toLowerCase() ?? '';
  const httpMethod = request.method?.toUpperCase() as HttpMethodType;
  const route = findRoute(httpMethod, url);

  if (!route) {
    throw new Error('Route not found.');
  }

  const params = parseParams(url, route);
  const resolvedRoute = {
    route,
    params,
  };

  return resolvedRoute;
};

export default resolve;
