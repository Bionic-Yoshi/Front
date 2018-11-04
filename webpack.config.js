const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './static/index.html'),
  filename: './index.html',
});
module.exports = {
  entry: path.join(__dirname, 'src/index.jsx'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(jsx)$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
          {
            loader: 'img-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    htmlWebpackPlugin,
    new CopyWebpackPlugin([{ from: 'static', to: '' }]),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  devServer: {
    port: 8080,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
  },
};
