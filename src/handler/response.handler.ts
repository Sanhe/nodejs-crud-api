import { ServerResponse } from 'node:http';
import IResponseData from '../response/response.data.interface';
import formatJson from '../formatter/json.formatter';

const handle = (response: ServerResponse, responseData: IResponseData) => {
  const formattedResponse = formatJson(responseData.data);

  response.writeHead(responseData.status, { 'Content-Type': 'text/plain' });
  response.end(formattedResponse);
};

export default handle;
