const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/ITA2024-root-config.js',
  output: {
    filename: 'ITA2024-root-config.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // Serve static files from the dist directory
    },
    compress: true,
    port: 9200,
    historyApiFallback: true, // Ensure the dev server handles client-side routing
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
    ],
  },
};
