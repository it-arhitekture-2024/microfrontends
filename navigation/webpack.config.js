const path = require('path');
const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react');
const StandaloneSingleSpaPlugin = require('standalone-single-spa-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'ITA2024',
    projectName: 'navigation',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    output: {
      publicPath: 'http://localhost:3009/',
    },
    devServer: {
      port: 3009,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      historyApiFallback: true,
    },
  });
};
