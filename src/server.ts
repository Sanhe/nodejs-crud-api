import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import handleRequest from './handler/request.handler';
import handleResponse from './handler/response.handler';

const server = (port: number) => {
  const appServer = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
      const responseData = await handleRequest(request);

      console.log(responseData);

      handleResponse(response, responseData);
    }
  );

  appServer.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
  });
};

export default server;
