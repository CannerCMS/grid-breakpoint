const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './docs/index.js',
  output: {
    path: path.join(__dirname, 'docs/static'),
    filename: 'bundle.js',
    libraryTarget: 'var'
  },
  externals: {
    'react': "React",
    'react-dom': "ReactDOM"
  },
  resolve: {
    extensions: ['.js']
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  plugins: [
    new webpack.BannerPlugin('This file is created by chilijung. Built time: ' + // eslint-disable-line max-len
      new Date())
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel',
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ],
        include: /flexboxgrid/
      }
    ]
  }
};
