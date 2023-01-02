import * as url from 'url';
import { resolve } from 'node:path';
import { Configuration } from 'webpack';

const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));

const config: Configuration = {
  entry: {
    app: './index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
      '.cjs': ['.cjs', '.cts'],
      '.mjs': ['.mjs', '.mts'],
    },
  },
  output: {
    filename: 'bundle.js',
    path: resolve(DIRNAME, 'dist'),
  },
};

export default config;
