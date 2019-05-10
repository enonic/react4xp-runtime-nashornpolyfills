# react4xp-runtime-nashornpolyfills

Builds a JS file ready to run in Nashorn, which polyfills the Nashorn engine with some JS functionality needed for server-side React rendering. Notably: Set, Map and setTimeout, and related. 

The [React4xp runtime library](https://github.com/enonic/lib-react4xp) already includes a hook to this library, handling its own polyfilling. 

However, should you need to **adjust or add your own polyfilling**, you can use the included `nashornPolyfills.es6` file as a template, and follow the description below to _override and replace_ React4xp's own Nashorn polyfill. 
 
 
## Installation

```bash
npm add --save-dev react4xp-runtime-nashornpolyfills
```

## Usage

```
webpack --config node_modules/react4xp-runtime-nashornpolyfills/webpack.config.js 
        --env.REACT4XP_CONFIG_FILE=[full path to a React4xp config JSON file] 
        --env.SOURCE=[full path to a source nashornPolyfills file]
```

### How does that work?

In short, the React4xp runtime lib looks for a shared-constants JSON file `react4xp_constants.json` in its own (runtime/post-build) folder - usually `<projectRoot>/build/resources/main/lib/enonic/react4xp`. Inside this constants file, it looks for the constants `BUILD_R4X` and `NASHORNPOLYFILLS_FILENAME`. If the file `<BUILD_R4X>/<NASHORNPOLYFILLS_FILENAME>.js` exists, the standard nashorn polyfills will be _skipped_, and that file will be run by Nashorn instead prior to rendering React components. 

`react4xp_constants.json` is not part of the runtime library, or this package - it's expected to be inserted into the lib folder in build-time. **The easiest way is to use [react4xp-buildconstants](https://www.npmjs.com/package/react4xp-buildconstants) to generate the constants file and let that steer the entire process.** The React4xp helper packages are tailored for this. _react4xp-buildconstants_ creates an "original" constants file with a location and name of your own choice, and copies it into the React4xp runtime lib folder, as `react4xp_constants.json`. 
  
Run Webpack with the included `webpack.config.js`, and use a `env.REACT4XP_CONFIG_FILE` [webpack environment variable](https://webpack.js.org/guides/environment-variables/) to point to the config file:

## Examples

```bash
webpack --config node_modules/react4xp-runtime-nashornpolyfills/webpack.config.js --env.REACT4XP_CONFIG_FILE=/me/myproject/react4xpConfig.json --env.SOURCE=/me/myproject/myModifiedNashornPolyfills.es6
```

If `/me/myproject/react4xpConfig.json` contains the following attributes... 

```json
{ 
	"BUILD_R4X": "/me/myproject/build/",
	"NASHORNPOLYFILLS_FILENAME": "nashornPolyfills"
}
```

...it will compile `/me/myproject/myModifiedNashornPolyfills.es6` into file `/me/myproject/build/nashornPolyfills.js`, which is run by React4xp as long as the copy `react4xp_constants.json` also has the same attributes. 

In this example, the "original" `react4xpConfig.json` is used. You could also point to the copy `react4xp_constants.json` in the runtimelib build folder instead, but the build folder might be less stable! Mintaining your own config file(s) instead of just using _react4xp-buildconstants_ seems unecessarily... hardcore? 

It's also possible to set the parameters directly with `env`, overriding the original config file or skipping it entirely (at least in this step - the copy is still required in runtime):

```bash
webpack --config .../webpack.config.js --env.SOURCE=/me/myproject/myModifiedNashornPolyfills.es6 --env.BUILD_R4X=/me/myproject/build/ --env.NASHORNPOLYFILLS_FILENAME=nashornPolyfills
```


## Attributes, constants, parameters

See [react4xp-buildconstants](https://www.npmjs.com/package/react4xp-buildconstants) for more information about the constants, but the following is crucial:

 - `BUILD_R4X`: the React4xp build folder. This is where the resulting nashornPolyfill JS file should be compiled into.

 - `NASHORNPOLYFILLS_FILENAME`: the name of the output JS file - _without the '.js' file extension_.
 
 - `SOURCE`: full path and name to your modified polyfills source file. If skipped, the included `nashornPolyfills.es6` is used instead.


## Contributions

Uses code from: https://gist.github.com/josmardias/20493bd205e24e31c0a406472330515a (Thank you!)

Suggestions, bug notices, improvements etc are welcome, just [contact me](mailto:espen42@gmail.com).
