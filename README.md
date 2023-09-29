# Project: FEND Capstone - Travel App

The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the **current** weather forecast. If the trip is in the future, you will get a predicted forecast within **16 days** from now.

## Description

- You need to enter valid fields
* The location must not be empty and the date must start from now until 16 days later.
* If you enter validly, your data will be saved in localStorage. When you refresh your browser, the data will still be there.

## Project prerequisites

- Webserver - Node
- Web application framework for routing - Express
- Build tool - Webpack. Using webpack, we will set up the app to have dev and prod environments, each with their own set of tools and commands.
- External script - Service Worker

## Get Up and Running

`cd` into your new folder and run:

- `npm install`
- `npm run build-prod` or `npm run build-dev`
- `npm start` to start the app
-
- this app runs on localhost:8081, but you can of course edit that in server.js
