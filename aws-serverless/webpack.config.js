const path = require('path');
const slswp = require('serverless-webpack');

module.exports = {
    mode: 'production',
    entry: './src/handler.ts',
    output: {
        filename: 'handler.js',
        path: path.resolve(__dirname, 'dist'),
        globalObject: `typeof self !== 'undefined' ? self : this`,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts'],
        fallback: { https: false },
    },
};
