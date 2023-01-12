import RouteType from './route.type';
import RouteParamsType from './route.params.type';

type ResolvedRouteType = {
  route: RouteType;
  params: RouteParamsType;
};

export default ResolvedRouteType;
