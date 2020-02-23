# EasyPropertyManagement Server

A [NodeJS](https://nodejs.org/en/) REST API server written with the [Express Framework](https://expressjs.com/).

## Dependencies

The following is a list of dependencies and their versions that must be installed to use this project.

* node@8.9.4 [nvm](https://github.com/creationix/nvm) is a great tool to manage multiple installations of node
* npm@5.6.0
* ng@1.7.4 [Angular CLI](https://cli.angular.io/)

## Starting the Server

Before starting the server be sure the dependencies are installed by running `npm install`.

Also be sure to run `npm test` to make sure the tests are passing and the test data is loaded.

Start the development server with hot reload can be started with:

```
npm run dev:server
```

The server can be started without hotreload by running:

```
npm start
```

The server is running with the console prints:

```
Server started at http://localhost:3000/
```

## TypeScript

This server is written in [TypeScript](https://www.typescriptlang.org/) a typed superset on JavaScript. 

## Datastore

We have written a very lightwieght in-memory datastore with flat file persistences. The API for the datastore is similar to the NoSQL MongoDB API, but definetly not a compatible API by any means.
