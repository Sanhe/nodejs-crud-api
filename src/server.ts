import { createServer } from 'http';

const server = (port: number) => {
  const appServer = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
  });

  appServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
};

export default server;
