import { constants as httpStatus } from 'node:http2';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import handleRequest from './handler/request.handler.js';
import handleResponse from './handler/response.handler.js';
import responseHeaders from './response/response.json.header.js';
import { INTERNAL_SERVER_ERROR } from './response/response.message.js';
import * as logger from './handler/log.handler.js';

const addServer = (port: number) => {
  const newServer = createServer(
    async (request: IncomingMessage, response: ServerResponse) => {
      logger.log(`${request.method} request received on port ${port}`);

      try {
        const responseData = await handleRequest(request);

        handleResponse(response, responseData);
      } catch (error) {
        response.writeHead(
          httpStatus.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          responseHeaders
        );
        response.end(INTERNAL_SERVER_ERROR);
      }
    }
  );

  return newServer;
};

const server = (port: number) => {
  const appServer = addServer(port);

  appServer.listen(port, () => {
    logger.log(`Server is running on PORT ${port}`);
  });
};

export default server;
export { addServer };
