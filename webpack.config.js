import * as url from 'node:url';
import { resolve } from 'node:path';

const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

const config = {
  entry: {
    app: './dist/index.js',
  },
  target: 'node',
  output: {
    filename: 'bundle.cjs',
    path: resolve(DIRNAME, 'build'),
  },
};

export default config;
