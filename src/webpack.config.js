// Transpiles nashorn polyfill from, among other things, npm libraries.

const path = require('path');

module.exports = env => {
    env = env || {};

    let BUILD_R4X;
    let BUILD_ENV;

    if (env.REACT4XP_CONFIG_FILE) {
        try {
            const config = require(env.REACT4XP_CONFIG_FILE);
            BUILD_R4X = config.BUILD_R4X;
            BUILD_ENV = config.BUILD_ENV;
        } catch (e) {}
    }

    return {
        mode: BUILD_ENV || 'production',

        entry: {
            'nashornPolyfills': path.join(__dirname, 'nashornPolyfills.es6'),
        },

        output: {
            path: env.BUILD_PATH || BUILD_R4X || path.join(__dirname, "build"),
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
