const base = require('./webpack.config.base');
let devMode, publicPath;
if (process.env.NODE_ENV === 'production') {
    publicPath = '';
    devMode = 'production';
} else {
    publicPath = 'js/';
    devMode = 'development';
}
/**
 * For Es Module
 */
const esmOutputPath =
    process.env.NODE_ENV === 'production'
        ? `${__dirname}/dist/${publicPath}`
        : `${__dirname}/dev/${publicPath}`;
const mdhEsm = {
    ...base,
    entry: {
        MultiDeviceHover: `${__dirname}/src/MultiDeviceHover.ts`
    },
    mode: devMode,
    output: {
        path: esmOutputPath,
        publicPath: publicPath,
        filename: '[name].js',
        library: 'MultiDeviceHover',
        libraryTarget: 'umd'
    }
};
/**
 * For stand-alone
 */
const standAloneOutputPath =
    process.env.NODE_ENV === 'production'
        ? `${__dirname}/dist/standalone/${publicPath}`
        : `${__dirname}/dev/${publicPath}`;
const mdhStandAlone = {
    ...base,
    entry: {
        mdh: `${__dirname}/src/mdh.ts`
    },
    mode: devMode,
    output: {
        path: standAloneOutputPath,
        publicPath: publicPath,
        filename: '[name].min.js'
    }
};
module.exports = [mdhEsm, mdhStandAlone];
