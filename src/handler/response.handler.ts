import { ServerResponse } from 'node:http';
import IResponseData from '../response/response.data.interface.js';
import formatJson from '../formatter/json.formatter.js';
import responseHeaders from '../response/response.json.header.js';

const handle = (response: ServerResponse, responseData: IResponseData) => {
  const formattedResponse = formatJson(responseData.data);

  response.writeHead(responseData.status, responseHeaders);
  response.end(formattedResponse);
};

export default handle;
