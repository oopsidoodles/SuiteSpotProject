# EasyPropertyManagement Server

A [NodeJS](https://nodejs.org/en/) REST API server written with the [Express Framework](https://expressjs.com/).

## Dependencies

The following is a list of dependencies and their versions that must be installed to use this project.

* node@8.9.4 [nvm](https://github.com/creationix/nvm) is a great tool to manage multiple installations of node
* npm@5.6.0
* ng@1.7.4 [Angular CLI](https://cli.angular.io/)

## Starting the Server

Before starting the server be sure the dependencies are installed by running `npm install`.

Also **be sure to run** `npm test` to make sure the tests are passing and the test data is loaded.

The server can be started by running:

```
npm start
```

## Features/Changes

- Split up Property and Unit
- Created/modified services, controllers, models (property, unit, user, auth)
- Made generic DAO object

For the most past, the changes/features added were to support the frontend, which mainly only GET's

ex. Tenant request forms do not get saved

## Bugs fixed (minor bugs only)
* PropertyController post -> get
* Query params converted to int
