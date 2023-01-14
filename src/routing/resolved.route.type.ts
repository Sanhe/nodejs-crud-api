import RouteType from './route.type.js';
import RouteParamsType from './route.params.type.js';

type ResolvedRouteType = {
  route: RouteType;
  params: RouteParamsType;
};

export default ResolvedRouteType;
