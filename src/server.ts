import { constants as httpStatus } from 'http2';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import handleRequest from './handler/request.handler';
import handleResponse from './handler/response.handler';
import responseHeaders from './response/response.json.header';
import { INTERNAL_SERVER_ERROR } from './response/response.message';
import * as logger from './handler/log.handler';

const server = (port: number) => {
  const appServer = createServer(
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

  appServer.listen(port, () => {
    logger.log(`Server is running on PORT ${port}`);
  });
};

export default server;
