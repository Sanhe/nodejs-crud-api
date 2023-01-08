import HttpMethodType from '../http.method.type';
import ActionType from '../action.type';

type RouterType = (httpMethod: HttpMethodType, path: string) => ActionType;

export default RouterType;
