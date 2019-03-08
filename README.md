# react4xp-runtime-nashornpolyfills

JS file (and source/build code for producing it) which, when run in Nashorn, will polyfill Nashorn with some necessary functionality for running React4xp's server-side rendering of react components, notably: Set, Map and setTimeout, and related. 


## Installation

```bash
npm add --save-dev react4xp-runtime-nashornpolyfills
```

## Usage

Intended for use in several ways, depending on your needs. Note that the two `nashornPolyfills` files (in `node_modules/react4xp-runtime-nashornpolyfills/` after installation) can be used in two different ways: 

  - `nashornPolyfills.js` is pre-compiled and ready to run in Nashorn, just copy it to where you need it and run it, or even add more ready-to-run JS code if you have more polyfilling needs.

  - `nashornPolyfills.es6` is uncompiled ES6 code. Can of course also be used as a pre-compilation template to add your own code to.

### Compiling

Generally, compile the ES6 file `nashornPolyfills.es6` with webpack from the project folder, directly on the `webpack.config.js` script, as installed with NPM as above:

```bash
webpack --config node_modules/react4xp-runtime-nashornpolyfills/webpack.config.js --env.REACT4XP_CONFIG_FILE=/me/myproject/react4xpConfig.json
```

You will need a JSON file that contains configuration constants for a React4XP project - `react4xpConfig.json` in the example above. You can use [react4xp-buildconstants](https://www.npmjs.com/package/react4xp-buildconstants) to easily generate it - handy for controlling an entire React4xp setup. 

Point to the config file with a `REACT4XP_CONFIG_FILE` [webpack environment variable](https://webpack.js.org/guides/environment-variables/). `REACT4XP_CONFIG_FILE` must be an absolute path and filename to a valid JSON file. The JSON in the file must have a `BUILD_R4X` attribute at the JSON root, and `BUILD_R4X` must be an absolute path to a build folder. It also needs a `NASHORNPOLYFILLS_FILENAME` attribute, which should _not_ have a .js file extension. For example:

```json
{ 
	"BUILD_R4X": "/me/myproject/build/",
	"NASHORNPOLYFILLS_FILENAME": "nashornPolyfills"
}
```

This will produce the file `/me/myproject/build/nashornPolyfills.js`.

## Contributions

Uses code from: https://gist.github.com/josmardias/20493bd205e24e31c0a406472330515a (Thank you!)

Suggestions, bug notices, improvements etc are welcome, just [contact me](mailto:espen42@gmail.com).
