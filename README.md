# Twitter TopLinks

This application is a POC (Proof of Concept) to store and analyse Twitter Tweets

# Project Highlights

  - Build on Node.js and React.js MERN Stack
  - Project is a Monorepo which creates a single artifact for both backend and front end
  - Both Frontend and Backend Code are done with ES6 with Babel 7 Transpiler
  - Precommit hooks to run lint and unit tests
  - Front end uses Atomic Design Patter for Components
  - Material UI for most part for Styling and Custom build Tweet atom with test
  - Redux integration for application store
  - Backend Index API contains a POC for Scalable Filtering on Resource (/tweets)
  - CD/CI to Heroku using Github Actions

# Links

  - Github - https://github.com/praneshkmr/twitter-toplinks
  - Live Demo - https://twitter-toplinks-poc.herokuapp.com/

# Installation

This Project requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd twitter-toplinks
$ yarn install
$ yarn run heroku-prebuild
$ yarn run dev
```

For production environments...

```sh
$ cd twitter-toplinks
$ yarn install
$ yarn run heroku-prebuild
$ yarn run heroku-postbuild
$ yarn run dev
```



License
----

MIT

