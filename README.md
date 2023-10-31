# Employee Directory - Backend
## Description
This is the backend for the Employee Directory application. It is built using Nest.js, Apollo GraphqQL, and MongoDB.


## Table of Contents
* [Installation](#installation)
* [Running the app](#running-the-app)
* [Questions](#questions)
* [License](#license)


## Demo
> Development Endpoint - introspection enabled
>[https://employee-directory.nazha.dev/graphql](https://employee-directory.nazha.dev/graphql)

## Installation

Init the project by running the following command:
```shell
sh ./scripts/init.sh
```


Install the necessary dependencies by running the following command:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Docker
```bash
# development - spins up Redis & MongoDB too
$ docker-compose up -f docker-compose-development.yml
```
```bash
# Production - spins up the app only
$ docker-compose up
```


## Documentation
> Documentation is generated using [Compodoc](https://compodoc.app/)

```bash
# Generate & Serve documentation
$ npm run doc:generate
```
Access the documentation at [http://localhost:8080](http://localhost:8080)

### GraphQL Schema Doc
> The GraphQL schema is generated using [GraphQL Code Generator](https://graphql-code-generator.com/)

```bash
# Generate GraphQL Schema Doc
$ npm run schema:generate
```
Access Schema Doc at schema.md in the root of the project

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Technologies
* [Nest.js](https://nestjs.com/)
* [Apollo GraphQL](https://www.apollographql.com/)
* [MongoDB](https://www.mongodb.com/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)
* [Jest](https://jestjs.io/)



## Questions
If you have any questions about this repository, open an issue or contact me directly at
[christian@nazha.dev](mailto:Christian@nazha.dev).

## License

Nest is [MIT licensed](LICENSE).
