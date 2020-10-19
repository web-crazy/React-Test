const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, '..', '/src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].[hash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.js$/,
        use: {
          loader:'babel-loader',
          options: {
            presets: ['env', 'es2015', 'react']            
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: true,
                localIdentName: '[name]__[local]--[hash:base64:5].css',
                sourcemaps: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourcemaps: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.s?css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourcemaps: true,
              },
            },
          ],
        }),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      {
        test: /\.(jpe?g|png|gif)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
