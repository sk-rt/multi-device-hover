
/**
 * Webpack config common
 */
module.exports = {
    target: 'web',
    devtool: false,
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
