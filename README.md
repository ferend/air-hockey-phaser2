# Phaser 2 Air Hockey Game
#### Phaser.io CE 2.15.0, Howler.js 2.1.3, TypeScript and Webpack 4.43, play nice together.

## Features

# Setup
To use this bootstrap you’ll need to install a few things before you have a working copy of the project.

## 1. Clone this repo:

Navigate into your workspace directory.

Run:

```git clone https://github.com/numbofathma/phaser-typescript-webpack.git```

## 2. Install node.js and npm:

https://nodejs.org/en/


## 3. Install dependencies:

Navigate to the cloned repo’s directory.

Run:

```npm install``` 

## 4. Run the development server:

Run:

```npm run start```

This will run a server so you can run the game in a browser.

Open your browser and enter localhost:8000 into the address bar.

As you change your code, Webpack will watch for changes and the browser will refresh.


## 5. Build for deployment:

Run:

```npm run build```

This will optimize and minimize the compiled bundle. Your code will be minified and uglyfied for reverse engineering protection.
The vendor library will only be minified because uglify will add extra MBs to your game.


## 6. Extra features
I've also added a command that auto-fixes your code according to the rules in the .eslintrc.json file.

Run:

``` npm run lint:fix```

...and also a commad to check your TypeScript types.

Run:

``` npm run check-types```
