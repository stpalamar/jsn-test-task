# JSN Test Task

## General Info

This is repository contains solution for test task for JSN

## Structure

-   [Backend](./backend) — Web application backend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Frontend](./frontend) — Web application frontend.

    _To work properly, fill in the **`.env`** file. Use the **`.env.example`** file as an example._

-   [Shared](./shared) — Web application common modules for reuse.

## Requirements

-   [NodeJS](https://nodejs.org/en/) (20.x.x);
-   [NPM](https://www.npmjs.com/) (10.x.x);

## How To Start in development mode

1. Install packages: **`npm run install:all`**
2. Fill ENVs
3. Run PostgreSQL: **`docker-compose up -d`**
4. Run migrations: **`npm run migrate:dev -w backend`**
5. Run seeds: **`npm run seed:dev:run -w backend`**
6. Run backend: **`npm run start:dev -w backend`**
7. Run frontend: **`npm run start:dev -w frontend`**

## How to Start in production mode

1. Set up ENVs in your environment
2. Run: **`npm run start`**
