# Wanderlust - Fullstack App

## Description

Wanderlust is a fullstack app that allows users to plan their trips, add useful hotel or other links, mark trips as done and see all past trips in a timeline.

## Tech Stack

- ReactJS
- TypeScript
- NodeJS
- Express
- MySQL
- Git

## Installation

- Clone the repository
- Install dependencies
- Run the server
- Run the client

You need to add a .env file to the root directory with the following variables for the database setup:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=yourDBName
DB_PORT=3306
SUPERSECRET = yourSecret
```

You also need a .env file at the client directory (for the React frontend) with the following variables for setting up the connection to Unsplash API (this is used for automatically obtaining a cover image for each trip):

```
VITE_ACCESS_KEY = yourAccessKeyForTheUnsplashAPI
VITE_DEFAULT_IMG= linkToYourDefaultImgInUnsplash
```
