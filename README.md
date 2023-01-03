# Simple CRUD API

## Description
This is a simple CRUD API using in-memory database underneath.

## Installation

```bash
git clone git@github.com:Sanhe/nodejs-crud-api.git

git checkout dev

npm ci
```

(!) Make sure to copy `.env.example` to `.env` and update the port value if needed.

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

