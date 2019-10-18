// Transpiles nashorn polyfill from, among other things, npm libraries.

const path = require('path');

module.exports = env => {
    env = env || {};

    let BUILD_R4X = env.BUILD_R4X;
    let BUILD_ENV = env.BUILD_ENV || "production";
    let NASHORNPOLYFILLS_FILENAME = env.NASHORNPOLYFILLS_FILENAME;

    let NASHORNPOLYFILLS_SOURCE = env.NASHORNPOLYFILLS_SOURCE; // || path.join(__dirname, 'nashornPolyfills.es6');

    if (env.REACT4XP_CONFIG_FILE) {
        try {
            // eslint-disable-next-line import/no-dynamic-require, global-require
            config = require(path.join(process.cwd(), env.REACT4XP_CONFIG_FILE));
            BUILD_R4X = BUILD_R4X || config.BUILD_R4X;
            BUILD_ENV = BUILD_ENV || config.BUILD_ENV;
            NASHORNPOLYFILLS_SOURCE = NASHORNPOLYFILLS_SOURCE || config.NASHORNPOLYFILLS_SOURCE
            NASHORNPOLYFILLS_FILENAME = config.NASHORNPOLYFILLS_FILENAME;
        } catch (e) {}
    }

    if (((BUILD_R4X || "") + "").trim() === "") {
        throw Error("Can't build nashorn polyfills without a build path (BUILD_R4X)");
    }

    if (((NASHORNPOLYFILLS_FILENAME || "") + "").trim() === "") {
        throw Error("Won't build nashorn polyfills without a target filename (NASHORNPOLYFILLS_FILENAME)");
    }

    return {
        mode: BUILD_ENV,

        entry: {
            [NASHORNPOLYFILLS_FILENAME]: NASHORNPOLYFILLS_SOURCE,
        },

        output: {
            path: BUILD_R4X,
            filename: "[name].js",
        },

        resolve: {
            extensions: ['.es6', '.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.es6$/,
                    exclude:  /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        compact: BUILD_ENV !== 'development',
                    },
                },
            ],
        },
    };
};
