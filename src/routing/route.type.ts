import HttpMethodType from '../http.method.type';

type RouteType = {
  path: string;
  method: HttpMethodType;
  handler: any;
  params: string[];
};

export default RouteType;
