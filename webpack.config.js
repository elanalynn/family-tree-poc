const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new ExtractTextPlugin('css/app.css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'app',
      meta: [
        {
          name: 'description',
          content: 'A proof-of-concept for a family tree made with d3'
        }
      ],
      mobile: true,
      lang: 'en-US',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto'
      ],
      inlineManifestWebpackName: 'webpackManifest',
      scripts: [
        'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.js',
        'https://d3js.org/d3-hierarchy.v1.min.js'
      ],
      title: 'Family Tree'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  watch: true
};
