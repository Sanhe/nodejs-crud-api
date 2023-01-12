import HttpMethodType from '../http.method.type';
import ResolvedRouteType from './resolved.route.type';

type RouterType = (
  httpMethod: HttpMethodType,
  path: string
) => ResolvedRouteType;

export default RouterType;
