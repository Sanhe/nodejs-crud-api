import routes from './routes';
import HttpMethodType from '../http.method.type';
import RouteType from './route.type';
import ActionType from '../action.type';
import RouteParamsType from './route.params.type';

const getRawParams = (path: string, route: RouteType): string[] => {
  const paramsString = path.replace(route.path, '');
  const isParamsStringEmpty = paramsString === '';

  if (isParamsStringEmpty) {
    return [];
  }

  const rawParams = paramsString.split('/');

  return rawParams;
};

const parseParams = (path: string, route: RouteType): RouteParamsType => {
  const rawParams = getRawParams(path, route);

  const params: RouteParamsType = {};

  route.params.forEach((paramName, index) => {
    params[paramName] = rawParams[index];
  });

  return params;
};

const findRoute = (
  httpMethod: HttpMethodType,
  path: string
): RouteType | undefined => {
  const route = routes.find((r: RouteType) => {
    const isMethodDifferent = r.method !== httpMethod;

    if (isMethodDifferent) {
      return false;
    }

    const isPathIncludesRoutePath = path.includes(r.path);

    if (!isPathIncludesRoutePath) {
      return false;
    }

    const rawParams = getRawParams(path, r);
    const rawParamsLength = rawParams.length;
    const isParamsLengthDifferent = rawParamsLength !== r.params.length;

    if (isParamsLengthDifferent) {
      return false;
    }

    return true;
  });

  return route;
};

const router = (httpMethod: HttpMethodType, path: string): ActionType => {
  const route = findRoute(httpMethod, path);

  if (!route) {
    throw new Error('Route not found.');
  }

  const params = parseParams(path, route);

  return {
    route,
    params,
  };
};

export default router;
