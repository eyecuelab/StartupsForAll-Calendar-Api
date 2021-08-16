# EyeCueLab Node API Template

This repository will serve as the node api template for new EyeCue projects and Internship Projects

## Design

- [Design Document](https://docs.google.com/document/d/13dnpyKql-TBuJCryyGCtroQdFnix2EyLkoiuoz1z_8A/edit?usp=sharing)
- Built with the [Nest](https://github.com/nestjs/nest) framework

## Installation/Setup

This project uses [yarn](https://yarnpkg.com/) package manager for Node. Please follow the [installation instructions](https://yarnpkg.com/getting-started/install) on their website.

```bash
# install dependencies
$ yarn
# create .env.dev file
cp .env.example .env.dev
# create .env.test file
cp .env.example .env.test
# update POSTGRES_DB to your test-db name
# create the databases
createdb <db-name>
createdb <test-db-name>
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Database/Migrations

Negotiation with a postgres instance is managed through [TypeORM](https://typeorm.io/#/) and the [@nestjs/typeorm](https://github.com/nestjs/typeorm) integration.

Migrations are managed via the [Typeorm CLI](https://github.com/typeorm/typeorm/blob/master/docs/using-cli.md) and the use of scripts in package.json. Most migrations can be generated automatically by changing or adding a `*.entity.ts` file and then running the generate script. Migrations should run automatically when starting the application but can also be run or rolled back manually for testing.

```bash
# generate a migration
yarn migration:generate -n <my_migration_name>
# create an empty migration
yarn migration:create -n <my_migration_name>
# run migrations
yarn migration:run
# revert migrations
yarn migration:revert
# list migrations and if they have been run
yarn migration:show
# show what sql would run to sync schema in DB with schema generated from *.entity.ts files
yarn schema:log
```
