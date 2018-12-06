const webpack = require('webpack');

let outputPath, devMode, publicPath;
if (process.env.NODE_ENV === 'production') {
    publicPath = 'standalone/';
    outputPath = `${__dirname}/dist/${publicPath}`;
    devMode = 'production';
} else {
    publicPath = 'js/';
    outputPath = `${__dirname}/dev/${publicPath}`;
    devMode = 'development';
}
module.exports = {
    entry: {
        mdh: `${__dirname}/src/mdh.ts`
    },
    target: 'web',
    mode: devMode,
    devtool: false,
    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: '[name].min.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            typeCheck: true,
                            fix: true
                        }
                    }
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: `${__dirname}/dev`,
        watchContentBase: true,
        open: true,
        host: '0.0.0.0',
        useLocalIp: true,
        port: 8888
    }
};
