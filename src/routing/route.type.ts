import HttpMethodType from './http.method.type';
import IResponseData from '../response/response.data.interface';

type RouteType = {
  path: string;
  method: HttpMethodType;
  handler: (model: any) => Promise<IResponseData>;
  params: string[];
};

export default RouteType;
