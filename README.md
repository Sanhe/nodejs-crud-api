# Simple CRUD API

This is a simple CRUD API using in-memory database underneath.

## Overview

It is built using Node.js and TypeScript.

### Repository Overview

- `src` - source code
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
npm install
```

* Copy `.env.example` to `.env` and update the API port value if needed.


## Run the application

There are 3 ways to run the application:

1. Run the application in development mode:

   ```bash
   npm run start:dev
   ```

   This command will run the application in development mode with `nodemon` and `ts-node` packages.
   If the logging is enabled in `.env`, the logs will be printed to the console with a message, i.e.
   
   ```bash
   Server is running on PORT 4000
   ``` 
   
   After that it's possible to make requests to the API. 

4. Run the application in production mode:

   ```bash
   npm run start:prod
   ```

   This command will transpile the application using `webpack` into `js` files in temporary folder `dist`   
   and then build it into `build/bundle.cjs` and finally run it.


3. Run the application in a multi-node `Cluster` environment:

    ```bash
    npm run start:multi
    ```

   This command implements horizontal scaling for application. It starts multiple instances of the application using 
   the Node.js Cluster API (equal to the number of logical processor cores on the host machine, each listening on port 
   PORT + n) with a load balancer that distributes requests across them (using Round-robin algorithm). 

Visit http://localhost:4000/ to see the application running. Use your port in `.env` file or calculated ports in multi-node mode.

## Using the application

It needs to use the next structure of the request body in POST and PUT requests (without id):

[User Interface](./src/component/user/user.interface.ts)

There is a Postman [collection](./user.postman_collection.json). You can import it to your Postman and use it.
Don't forget to set environment variables in Postman, i.e. {{URL}}, {{USER_ID}}.

### Create a new user

```bash
POST /api/users
```

### Get a user

```bash
GET /api/users/:id
```

### Update a user

```bash
PUT /api/users/:id
```

### Delete a user

```bash
DELETE /api/users/:id
```

### Get all users

```bash
GET /api/users
```

## Testing

* Run integration tests:

```bash
npm run test
```


## Notes

* The application uses `uuid` package with `v4` version to generate unique IDs for each record, i.e. `97befd16-6271-4862-8247-e13244628798`.
