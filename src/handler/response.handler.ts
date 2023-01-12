import { ServerResponse } from 'node:http';
import IResponseData from '../response/response.data.interface';
import formatJson from '../formatter/json.formatter';
import headers from '../response/response.json.header';

const handle = (response: ServerResponse, responseData: IResponseData) => {
  const formattedResponse = formatJson(responseData.data);

  response.writeHead(responseData.status, headers);
  response.end(formattedResponse);
};

export default handle;
