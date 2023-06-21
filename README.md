[![Netlify Status](https://api.netlify.com/api/v1/badges/66ee2b4b-50de-41cc-8726-7e790e51674f/deploy-status)](https://app.netlify.com/sites/cp-book-tracker/deploys)

[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=xIvqn_cp-book-tracker&metric=bugs)](https://sonarcloud.io/summary/new_code?id=xIvqn_cp-book-tracker)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=xIvqn_cp-book-tracker&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=xIvqn_cp-book-tracker)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=xIvqn_cp-book-tracker&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=xIvqn_cp-book-tracker)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=xIvqn_cp-book-tracker&metric=coverage)](https://sonarcloud.io/summary/new_code?id=xIvqn_cp-book-tracker)

# CP Book Tracker

**CP Book Tracker** is a Single Page Application (SPA) built for tracking progress on the Competitive Programming Book written by _Felix Halim_. 

## Description

As an enthusiast of competitive programming, I was looking for some incentive to progress on the CP Book. Since the [uHunt](https://uhunt.onlinejudge.org/) webpage provides a compact interface for that book's problems, I decided to create a more visual and intuitive version of that, using _Node.js_, _Angular_ and _TypeScript_ to deepen into web application development.

As for now, the **CP Book Tracker** application has a live demo deployed using the [Netlify](https://netlify.com) service. However, it can be built and run locally, see details below.

## Table of Contents

- [Installation](#installation)
- [Desktop Application](#desktop-application)
- [Features](#features)
- [Usage](#usage)
- [Tests](#tests)
- [How to contribute](#how-to-contribute)
- [Credits](#credits)
- [License](#license)

## Installation

If you just want to use the application, you can use the [live version](https://cp-book-tracker.netlify.app/).

Otherwise, you can either run it locally or build it for production. Follow the steps to clone the repository and install its dependencies:

1. Open a terminal.
2. If you don't have Node.js installed on your machine, install it using `sudo apt-get install -y nodejs`, if you use a Debian/Ubuntu-based distro. For other options, check https://nodejs.org/en/download and https://nodejs.org/en/download/package-manager
2. Clone this repository using `git clone https://github.com/xIvqn/cp-book-tracker.git`.
3. Go to the angular project folder using `cd cp-book-tracker/`.
4. Initialize the node project using `npm i`.
5. Install **Angular CLI** globally using `npm i -g @angular/cli`.

Now with everything set up, you might want to run the [development server](#development-server) or build the application for [production](#production) and then deploy it.

### Development server

With the development server, the application will be reloaded with any changes you make to its source files. Follow the steps for running it:

1. In a terminal, while on the Angular project folder, run the server with `ng serve`.
2. Now you've got the Angular application running on https://localhost:4200.


### Production

Once you have the project built, you can now deploy it. Follow the steps for building it:

1. In a terminal, while on the Angular project folder, run the server with `ng build`.
2. The build artifacts will be stored in the `dist/` directory.

## Desktop Application

Since version 1.1.0, you can now run the CP Book Tracker app as a desktop application. You can find it in [releases](https://github.com/xIvqn/cp-book-tracker/releases), under the assets section of the desired version.

For using them, you just have to download the desired binaries and run the executable.

### Build instructions

Once you have the repository cloned and the project initialized (see [installation](#installation) section for further instructions), you just need to run `npm run package:[platform]` in a terminal while on the project directory replacing `[platform]` with the desired platform to build the binaries for it. This argument can be one of the following:

* For Linux distros use `package:linux`.
* For Windows use `package:win`.
* For MacOS (Darwin) use `package:osx`.

## Features

* **Shows problems** from the Competitive Programming book.
* Switch within the first **3 editions** of the book.
* **User tracking** on onlinejudge website.
* Indicators on **starred** problems.
* **Visual feedback** on solved problems.
* **Top 3 verdicts** display for each problem.
* **Quick Submit**, **uDebug** and **PDF** download buttons for each problem.
* Solved and total **problems counter** for chapters and sections.
* **Visual feedback** on completed chapters and sections.
* **Collapsing containers** for chapters.

## Usage

Right after opening the web application, you can check the chapters of the 3rd edition of the book. On the navigation bar, you can switch editions with the dropdown or search for a specific user. Also, you can extend a chapter to see its sections, problem sets and individual problems. 

Chapters and sections have an indicator of how many problems have been solved in each category. On the other hand, problems are highlighted with different colors, depending on their state:

* Yellow problems are **starred ( \* )** in the **Competitive Programming** book, indicating they are strongly recommended to be solved.
* Green problems are already solved by the user.
* Grey problems have neither been solved, nor starred.

To highlight the solved problems in green, you must check for a valid username of the [onlinejudge](https://onlinejudge.org/) website. You can input your username in its field, on the top bar. After that, you will have your solved problems highlighted in green.

Also, each problem card has the **DACU**, which indicates the Different ACcepted Users for that problem, and the rates for the most indicative verdicts:

* **ACs** indicates the number of ACcepted solutions.
* **WAs** indicates the number of Wrong Answers submitted.
* **TLEs** indicates the number of submissions with the Time Limit Exceeded.

## Tests

Planned to do.

## How to Contribute

Work in progress. More information will be added soon to this section.

## Credits

Thanks to [Felix Halim](https://github.com/felix-halim) for writing all 4 editions of the [Competitive Programming book](https://cpbook.net/), and both [uHunt website](https://uhunt.onlinejudge.org/) and [uHunt API](https://uhunt.onlinejudge.org/api/). 

Also, thanks to [uDebug](https://www.udebug.com/) for being such a useful website.

### Collaborators

Currently, I, [xIvqn](https://github.com/xIvqn/), am the only collaborator on the project. 

If you want to contribute, feel free to leave a pull request from your fork, or either leave an issue if you find one! If you need more information about it, check the [How to Contribute](#how-to-contribute) section.

## License

Licensed under the [GNU General Public License v3.0](./LICENSE).
