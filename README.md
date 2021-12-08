# Kheops Technical Test

## Getting Started

### Prerequisites

For this project you should have the latest Long Term Support version of Node.js and npm installed on your computer.

You should also have access to a test account in order to use the Spotify API.

### Install

In the root folder, run the following command

```sh
npm install
```

to install all the npm packages needed for the project.

In the file `src/config.js`, replace the client id and client secret values by the ones from the Spotify test project.

Then run 
```sh
npm run start
```

to start a local server that will serve the project. You can access the main page at http://localhost:1234/.

### Authorized tools and libraries

You can use any tool or library that match the needs of the test, except any web client that is designed for the Spotify API.

## Test Objectives

The main objective is to:
1. Search tracks and retrieve them from Spotify API
2. Display track information

This can be done by completing the file `src/components/SearchTracks.jsx`.

There are two optional objectives for the project:
1. Add an infinite scroll to the list of Tracks.
2. Handle access token expiration: When a token expires, a new one should be acquired using a refresh token.

For the second optional objective, you can find some help here https://developer.spotify.com/documentation/general/guides/authorization/code-flow/.

## Useful link

* Link to Spotify API: https://developer.spotify.com/documentation/web-api/reference/#/
* Link to Spotify for Developers Dashboard: https://developer.spotify.com/dashboard/applications
* Link to React Hooks guide: https://reactjs.org/docs/hooks-intro.html
