# EasyPropertyManagement Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Dependencies

The following is a list of dependencies and their versions that must be installed to use this project.

* node@8.9.4 [nvm](https://github.com/creationix/nvm) is a great tool to manage multiple installations of node
* npm@5.6.0
* ng@1.7.4 [Angular CLI](https://cli.angular.io/)

## Development server

First install the dependencies with `npm install`.

Run `npm start` for a dev server. Navigate to `http://localhost:4500/`.

## Notes
This project uses Bootstrap (+jQuery dependency), however due to a bug, the `.angular-cli.json` file is ignored, making it impossible to link the scripts normally. Instead, the bootstrap and jQuery packages have been copied into `/src/assets/`

As a result Bootstrap and jQuery versions have been fixed in `package.json`

You **do not** have to copy the packages in order to run, they are already there

## Features
- Login view (uses `AuthService`)
  - username: `admin`
  - password: `123`
- Scrollable properties list +search bar (matches name & address, uses `PropertyService`)
- Properties view with scrollable list of units, floor select dropdown (uses `UnitService`)
- Ability to submit tenant request forms (click on a specific unit, uses `UnitService`)
- Smooth transition animation between views :smiley:
