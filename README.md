# Notes App

## Description

This application is a notes app. In order for the user to access the app functionality, they need to register first. After user logs in, they can visualize and manage their own notes.

## API Endpoints

- `POST /auth/signup` - registers a new user
- `POST /auth/login` - logs in a user
- `POST /notes` - creates a new note
- `GET /notes` - retrieves all user notes
- `GET /notes/:id` - retrieves a user note by id
- `PATCH /notes/:id` - updates a user note
- `DELETE /notes/:id` - deletes a user note

See [Postman Collection](resources/Notes%20App.postman_collection.json)

## Technologies used

- Nest.js
- TypeScript
- TypeORM
- PostgreSQL
- JWT

## Prerequisites

You need to have a PostgreSQL DB called `notes-db`. The database config (such as name, host, port etc) is defined in the `.env` file.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run migrations
$ npm run migration:run

# build the app
$ npm run build

# run the app
$ npm run start
```
