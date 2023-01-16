import HttpMethodType from './http.method.type.js';
import ResolvedRouteType from './resolved.route.type.js';

type RouterType = (
  httpMethod: HttpMethodType,
  path: string
) => ResolvedRouteType;

export default RouterType;
