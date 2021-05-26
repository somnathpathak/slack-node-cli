# Node CLI for Slack

Node.js based Command Line Interface (CLI) for Slack making use of Slack Web APIs

---
## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node (> v12)
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

---

## Install

    $ cd slack-node-cli
    $ npm install

## Running the project

    $ npm link

## Running tests

    $ npm run test

## Sample CLI command for sending slack message

    $ slack-node-cli sendmessage
