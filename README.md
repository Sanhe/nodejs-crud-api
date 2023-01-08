# Simple CRUD API

This is a simple CRUD API using in-memory database underneath.

## Overview

It is built using Node.js and TypeScript.

### Repository Overview

- `src` - source code
- `src/controllers` - controllers
- `build` - compiled production code in one file `bundle.cjs`
- `dist` - temporary directory for compiled code for build process

## Presets

Node.js v18.12.1 is installed.

## Getting Started

* Clone the repository to get the latest version of the code.

```bash
git clone git@github.com:Sanhe/nodejs-crud-api.git
```

* Switch to dev branch.

```bash
git checkout dev
```

* Run npm installation.
```bash
npm ci
```

* Copy `.env.example` to `.env` and update the API port value if needed.


## Run the application

There are 3 ways to run the application:

1. Run the application in development mode:

   ```bash
   npm run start:dev
   ```

   This command will run the application in development mode with `nodemon` and `ts-node` packages.

2. Run the application in production mode:

   ```bash
   npm run start:prod
   ```

   This command will build the application using `webpack` to the `build/bundle.cjs` file and run it.

3. Run the application in a multi-node `Cluster` environment:

    ```bash
    npm run start:multi
    ```

   This command implements horizontal scaling for application. It starts multiple instances of the application using 
   the Node.js Cluster API (equal to the number of logical processor cores on the host machine, each listening on port 
   PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm). 

Visit http://localhost:4000/ to see the application running. Use your port in `.env` file or calculated ports in multi-node mode.
