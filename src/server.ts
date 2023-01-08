import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import router from './routing/router';
import HttpMethodType from './http.method.type';
import ActionType from './action.type';

const server = (port: number) => {
  const appServer = createServer(
    (request: IncomingMessage, response: ServerResponse) => {
      const url: string = request.url || '';
      const httpMethod = request.method?.toUpperCase() as HttpMethodType;
      const action: ActionType = router(httpMethod, url);

      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('Hello World');
    }
  );

  appServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

export default server;
