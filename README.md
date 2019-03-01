# react4xp-runtime-nashornpolyfills

JS file (and source/build code for producing it) which, when run in Nashorn, will polyfill Nashorn with some necessary functionality for running React4xp's server-side rendering of react components.

Polyfills Set, Map and setTimeout and related. Uses: https://gist.github.com/josmardias/20493bd205e24e31c0a406472330515a

  - [Installation](#installation)
  - [Usage](#usage)
    - [Compiling with webpack](#compiling-with-webpack)
      - [Control the output location with `env.BUILD_PATH`](#control-the-output-location-with-envbuild_path)
      - [Control the output with a React4xp config file](#control-the-output-with-a-react4xp-config-file)


## Installation

```bash
npm add --save-dev react4xp-runtime-nashornpolyfills
```

## Usage

Intended for use in several ways, depending on your needs. Note that the two `nashornPolyfills` files under the `/lib` folder (in `node_modules/react4xp-runtime-nashornpolyfills/`) are meant to be used in different ways: 

  - `nashornPolyfills.js` is pre-compiled and ready to run in Nashorn, just copy it to where you need it and run it, or even add more ready-to-run JS code if you have more polyfilling needs.

  - `nashornPolyfills.es6` is uncompiled ES6 code, if you need or prefer that build step. Can of course also be used as a pre-compilation template to add your own code to.

### Compiling with webpack

The ES6 file `nashornPolyfills.es6` can be compiled in regular ways, such as Webpack or Babel. 

Here are a few ways to use it easily with webpack. Generally, run webpack from the project folder, directly on the webpack.config script, as installed with NPM as above:

```bash
webpack --config node_modules/react4xp-runtime-nashornpolyfills/lib/webpack.config.js
```

This will output the nashorn-runnable JS file `nashornPolyfills` in a generic new `/build` folder under `node_modules/react4xp-runtime-nashornpolyfills/lib/`. 


#### Control the output location with `env.BUILD_PATH`

Inserting an absolute path in a `BUILD_PATH` webpack environment variable, controls the output location:

```bash
webpack --config node_modules/react4xp-runtime-nashornpolyfills/lib/webpack.config.js --env.BUILD_PATH=/me/myproject/build
```

...will produce the file `/me/myproject/build/nashornPolyfills.js`.

#### Control the output with a React4xp config file

If you already have a JSON file that contains a config for a React4XP project (you can use [react4xp-buildconstants](https://www.npmjs.com/package/react4xp-buildconstants) to easily generate it - handy to control an entire React4xp setup), you can point to the config file with a `REACT4XP_CONFIG_FILE` webpack environment variable. `REACT4XP_CONFIG_FILE` must be an absolute path and filename to a valid JSON file, which must have a `BUILD_R4X` attribute at the JSON root, and `BUILD_R4X` must be an absolute path to a folder.

If the file contents in `/me/myproject/config.json` look something like this...

```json
{ "BUILD_R4X": "/me/myproject/build/" }
```

...then running...

```bash
webpack --config node_modules/react4xp-runtime-nashornpolyfills/lib/webpack.config.js --env.REACT4XP_CONFIG_FILE=/me/myproject/config.json
```

...will produce `/me/myproject/build/nashornPolyfills.js`.
