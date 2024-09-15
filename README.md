Cron Expression Parser

Overview

 - This project is a cron expression parser that breaks down standard cron expressions into readable components. It interprets the timing fields (minute,hour, day of month, month, day of week) and the command, providing detailed breakdowns for each.

Prerequisites

    - Before you can run this project, you need to have Node.js and npm (Node Package Manager) installed on your machine.
    - Install Node.js and npm
    - Visit the official https://nodejs.org/en website and download the latest stable version (LTS is recommended).
    - Run the installer and follow the instructions. The installation will also include npm (Node Package Manager). https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
    - Verify Installation 
        node -v
        npm -v
    - After installation, open a terminal or command prompt and run the following commands to verify that Node.js and npm were installed successfully:

Features
    - Supports standard cron syntax including intervals (*/15), ranges (1-5), and lists (1,3,5).
    - Converts cron fields into human-readable format.
    - Outputs detailed and correctly formatted cron field interpretations.
    - Handles common cron cases such as:
    - */15 * * * * – every 15 minutes
    - 0 0 1 * * – at midnight on the 1st day of every month
    - 5 4 * * sun – at 4:05 AM on every Sunday

Installation

    - Unzip file or download from the git repository - 
    - cd deliveroo-cron-parser
    - npm install

To Run Cron Parser

    - node parser.js '*/15 0 1,15 * 1-5 /usr/bin/find'
    - node parser.js '*/15 0 1,12,15 * 1-5 /usr/bin/find'
    - node parser.js '*/15 0 1,15 * * /usr/bin/find'


Running Test Cases

    - npm test

Supported Cron Syntax

    Symbol	Description
    *	: Any value for that field
    ,	: Comma-separated list of values
    -	: Range of values (e.g., 1-5)
    /	: Step values (e.g., */15 for every 15 minutes)

Project Structure

    ├── cronParser.js          # Core parsing logic
    ├── test.js            # Unit tests using Mocha and Chai
    ├── constants.js       # Contains reusable constants like day and month info
    └── README.md          # Cron Parser documentation (this file)

To use Cron Parser for other projects

    - const parseInputString = require('./parser');
    - const input = '*/15 0 1,15 * 1-5 /usr/bin/find';
    - const result = parseInputString(input);
    - console.log(result);

Future Scope

    - Multiple spaces needs to be handled
    - We make a csv parser where huge numbers of parser string can be displayed.