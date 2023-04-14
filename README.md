# Oper Assessment

This project was created as a part of the Oper Techical Interview. It is a simple web application that allows users to view current weather and a 4-day forecast in advance. The application is built in Angular 15 and by using the OpenWeatherMap API.

## Environment files

Sincle the application uses an API key to communicate with OpenWeatherMap API, the application requires an environment file to be created. The file should be placed in the `src/environments` folder and should be named `environment.ts`. The file should contain the following:

```typescript
apiKey: string
apiUrl: string
```

Please ask Merlina for these files, since they are not included in the repository. This is done to prevent the API key from being exposed.

## Commits

Please note the application has a pre-commit hook that runs prettier and linter. This is done to ensure that the code is formatted and linted correctly. If you wish to skip this, you can use the `--no-verify` flag when committing.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
