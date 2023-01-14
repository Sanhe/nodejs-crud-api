import HttpMethodType from './http.method.type.js';
import IResponseData from '../response/response.data.interface.js';

type RouteType = {
  path: string;
  method: HttpMethodType;
  handler: (model: any) => Promise<IResponseData>;
  params: string[];
};

export default RouteType;
